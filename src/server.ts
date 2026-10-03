import "./lib/error-capture";

import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

dotenv.config();

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const MAX_BODY_BYTES = 1024 * 1024;
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 3000;
const rateLimitStore = new Map<string, number[]>();

function normalizeString(value: unknown): string {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

function normalizeOrigin(value: string | null | undefined): string | null {
  if (!value) return null;

  try {
    const parsed = new URL(value);
    return parsed.origin;
  } catch {
    return value.replace(/\/$/, "");
  }
}

function isLocalDevOrigin(origin: string): boolean {
  try {
    const parsedOrigin = new URL(origin);
    const hostname = parsedOrigin.hostname.toLowerCase();
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  } catch {
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function getCorsOrigin(requestOrigin: string | null): string | null {
  const configuredOrigin = normalizeOrigin(process.env.FRONTEND_URL);
  const requestedOrigin = normalizeOrigin(requestOrigin);

  if (!requestedOrigin) {
    return configuredOrigin;
  }

  if (requestedOrigin === configuredOrigin || isLocalDevOrigin(requestedOrigin)) {
    return requestedOrigin;
  }

  return configuredOrigin;
}

function getJsonResponse(data: Record<string, unknown>, status = 200, requestOrigin: string | null = null): Response {
  const corsOrigin = getCorsOrigin(requestOrigin);

  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(corsOrigin ? { "Access-Control-Allow-Origin": corsOrigin } : {}),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    },
  });
}

export function isAllowedOrigin(origin: string | null): boolean {
  const configuredOrigin = normalizeOrigin(process.env.FRONTEND_URL);
  const requestedOrigin = normalizeOrigin(origin);

  if (!requestedOrigin) {
    return true;
  }

  if (configuredOrigin && requestedOrigin === configuredOrigin) {
    return true;
  }

  return isLocalDevOrigin(requestedOrigin);
}

function enforceRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const requests = rateLimitStore.get(ip) ?? [];
  const recentRequests = requests.filter((timestamp) => now - timestamp < windowMs);

  if (recentRequests.length >= 5) {
    rateLimitStore.set(ip, recentRequests);
    return false;
  }

  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return true;
}

async function handleContactRequest(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    const corsOrigin = getCorsOrigin(origin);
    return new Response(null, {
      status: 204,
      headers: {
        ...(corsOrigin ? { "Access-Control-Allow-Origin": corsOrigin } : {}),
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        Vary: "Origin",
      },
    });
  }

  if (!isAllowedOrigin(origin)) {
    return getJsonResponse({ success: false, message: "Origin not allowed." }, 403, origin);
  }

  if (request.method !== "POST") {
    return getJsonResponse({ success: false, message: "Method not allowed." }, 405);
  }

  const ip = getClientIp(request);
  if (!enforceRateLimit(ip)) {
    return getJsonResponse({ success: false, message: "Too many messages. Please try again in 15 minutes." }, 429);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return getJsonResponse({ success: false, message: "Request body must be JSON." }, 400);
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return getJsonResponse({ success: false, message: "Message is too large." }, 413);
  }

  let payload: ContactPayload;
  try {
    payload = rawBody ? (JSON.parse(rawBody) as ContactPayload) : {};
  } catch {
    return getJsonResponse({ success: false, message: "Invalid JSON payload." }, 400);
  }

  const name = normalizeString(payload.name);
  const email = normalizeString(payload.email).replace(/\s+/g, "");
  const message = normalizeString(payload.message);
  const honeypot = normalizeString(payload.website);

  if (honeypot) {
    return getJsonResponse({ success: false, message: "Invalid submission." }, 400);
  }

  if (!name || !email || !message) {
    return getJsonResponse({ success: false, message: "Name, email, and message are required." }, 400);
  }

  if (name.length > MAX_NAME_LENGTH) {
    return getJsonResponse({ success: false, message: "Name must be 100 characters or less." }, 400);
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return getJsonResponse({ success: false, message: "Message must be 3000 characters or less." }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return getJsonResponse({ success: false, message: "Please provide a valid email address." }, 400);
  }

  const mailUser = process.env.MAIL_USER?.trim();
  const mailAppPassword = process.env.MAIL_APP_PASSWORD?.replace(/\s+/g, "").trim();
  const mailTo = process.env.MAIL_TO?.trim();

  if (!mailUser || !mailAppPassword || !mailTo) {
    console.error("Missing email configuration for contact form.");
    return getJsonResponse({ success: false, message: "Email service is not configured." }, 500, origin);
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: mailUser,
        pass: mailAppPassword,
      },
    });

    const htmlMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const textBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from: `Portfolio Contact <${mailUser}>`,
      to: mailTo,
      replyTo: email,
      subject: `New portfolio inquiry from ${name}`,
      text: textBody,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <div>${htmlMessage}</div>
        </div>
      `,
    });

    return getJsonResponse({ success: true }, 200, origin);
  } catch (error) {
    console.error("Contact email failed:", error);
    return getJsonResponse({ success: false, message: "Failed to send your message. Please try again later." }, 500, origin);
  }
}

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/contact") {
        return await handleContactRequest(request);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
