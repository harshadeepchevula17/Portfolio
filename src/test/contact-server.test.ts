import { afterEach, describe, expect, it } from "vitest";

import { isAllowedOrigin } from "../server";

describe("contact server origin checks", () => {
  const originalFrontendUrl = process.env.FRONTEND_URL;

  afterEach(() => {
    if (originalFrontendUrl === undefined) {
      delete process.env.FRONTEND_URL;
    } else {
      process.env.FRONTEND_URL = originalFrontendUrl;
    }
  });

  it("allows local dev origins even when the configured frontend port differs", () => {
    process.env.FRONTEND_URL = "http://localhost:3000";

    expect(isAllowedOrigin("http://localhost:8080")).toBe(true);
    expect(isAllowedOrigin("http://127.0.0.1:8080")).toBe(true);
  });

  it("blocks unrelated external origins", () => {
    process.env.FRONTEND_URL = "http://localhost:8080";

    expect(isAllowedOrigin("https://example.com")).toBe(false);
  });
});
