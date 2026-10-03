import { motion } from "motion/react";
import {
  Activity,
  Bot,
  Calendar,
  CreditCard,
  ShieldCheck,
  UserCheck,
  Cpu,
  Layers,
  Server,
  Database,
  Send,
  Inbox,
  ListOrdered,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

/**
 * Custom Visual Showcase for MediConnect:
 * Modern healthcare software platform with patient workflow, appointment scheduler,
 * and integrated MediAssist AI Assistant panel.
 */
export function MediConnectVisual({ isHovered = false }: { isHovered?: boolean }) {
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-[#0c1424] via-[#09101c] to-[#040810] p-3 sm:p-4 text-xs select-none shadow-inner">
      {/* Background cyber grid & glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-primary/10 blur-[60px]" />

      {/* Top Browser / SaaS Interface Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/40 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-destructive/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <span className="h-2 w-2 rounded-full bg-lime/80" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground ml-2">
            mediconnect.platform/portal
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
          <ShieldCheck size={11} />
          <span>JWT • RBAC Active</span>
        </div>
      </div>

      {/* Main SaaS Dashboard Layout */}
      <div className="relative z-10 mt-3 grid grid-cols-12 gap-2.5 h-[calc(100%-38px)]">
        {/* Left Side: Healthcare Workflows & Appointments (7 cols) */}
        <div className="col-span-7 flex flex-col justify-between space-y-2">
          {/* Patient Overview Mini-Widget */}
          <div className="rounded-xl border border-border/60 bg-card/70 p-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-display text-[10px] uppercase font-bold text-foreground/90 flex items-center gap-1.5">
                <UserCheck size={12} className="text-primary" /> Patient Records
              </span>
              <span className="text-[9px] font-mono text-lime bg-lime/10 px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-[9px] font-mono">
              <div className="bg-secondary/70 p-1.5 rounded border border-border/40">
                <span className="text-muted-foreground block text-[8px]">TRIAGE</span>
                <span className="text-foreground font-semibold">Normal</span>
              </div>
              <div className="bg-secondary/70 p-1.5 rounded border border-border/40">
                <span className="text-muted-foreground block text-[8px]">SLOT</span>
                <span className="text-primary font-semibold">10:30 AM</span>
              </div>
              <div className="bg-secondary/70 p-1.5 rounded border border-border/40">
                <span className="text-muted-foreground block text-[8px]">PAYMENT</span>
                <span className="text-lime font-semibold">Paid</span>
              </div>
            </div>
          </div>

          {/* Scheduling & Telemetry chart */}
          <div className="rounded-xl border border-border/60 bg-card/70 p-2.5 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-display font-semibold text-foreground/80 flex items-center gap-1">
                <Calendar size={11} className="text-primary" /> Schedule Queue
              </span>
              <span className="text-[9px] font-mono text-muted-foreground">Dr. Workflow</span>
            </div>

            {/* Simulated Data Bar visualization */}
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center gap-2 text-[9px] font-mono text-muted-foreground">
                <span className="w-12 truncate">Patient #1</span>
                <div className="flex-1 bg-secondary rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full w-[85%] rounded-full" />
                </div>
                <span className="text-[8px] text-primary">In Care</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-mono text-muted-foreground">
                <span className="w-12 truncate">Patient #2</span>
                <div className="flex-1 bg-secondary rounded-full h-1.5 overflow-hidden">
                  <div className="bg-lime h-full w-[60%] rounded-full" />
                </div>
                <span className="text-[8px] text-lime">Scheduled</span>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-border/40 flex items-center justify-between text-[9px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1"><CreditCard size={10} /> Gateway Active</span>
              <span className="text-primary">Dockerized</span>
            </div>
          </div>
        </div>

        {/* Right Side: MediAssist AI Panel (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between rounded-xl border border-primary/40 bg-gradient-to-b from-primary/15 via-card/90 to-primary/5 p-2.5 shadow-md">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-display text-[10px] uppercase font-bold text-primary flex items-center gap-1">
                <Bot size={13} className="text-primary animate-pulse" /> MediAssist
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
            </div>
            <p className="mt-1 text-[9px] text-muted-foreground leading-tight">
              Virtual Healthcare Assistant
            </p>
          </div>

          {/* AI Dialogue Chat bubble simulation */}
          <div className="my-1.5 space-y-1.5">
            <div className="rounded-lg bg-secondary/80 p-2 text-[9px] border border-border/50 text-foreground/90">
              <span className="text-primary font-bold text-[8px] block uppercase font-mono">Assistance</span>
              Patient profile retrieved. Ready for role-based consultation workflow.
            </div>
          </div>

          <div className="pt-1.5 border-t border-primary/20 flex items-center justify-between text-[8px] font-mono text-primary">
            <span>Spring Boot API</span>
            <span className="text-lime">&bull; Online</span>
          </div>
        </div>
      </div>

      {/* Hover Technical Architecture Pill Overlay */}
      <div className="pointer-events-none absolute bottom-2 right-2 z-20 flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono text-primary border border-primary/30 shadow-md">
        <Sparkles size={10} className="animate-spin text-primary" />
        <span>Platform UI Concept &bull; Healthcare + AI</span>
      </div>
    </div>
  );
}

/**
 * Custom Visual Showcase for Email Scheduler:
 * Futuristic background queue processing dashboard with scheduled job table,
 * BullMQ + Redis worker pipeline, and decoupled PostgreSQL persistence layer.
 */
export function EmailSchedulerVisual({ isHovered = false }: { isHovered?: boolean }) {
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl border border-lime/30 bg-gradient-to-br from-[#0a1518] via-[#081014] to-[#04080a] p-3 sm:p-4 text-xs select-none shadow-inner">
      {/* Background cyber grid & glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--lime)_18%,transparent),transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-lime/10 blur-[60px]" />

      {/* Top Browser / SaaS Interface Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/40 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-destructive/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <span className="h-2 w-2 rounded-full bg-lime/80" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground ml-2">
            scheduler.bullmq.internal/queue
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-lime bg-lime/10 px-2 py-0.5 rounded-full border border-lime/20">
          <Lock size={10} />
          <span>Google OAuth</span>
        </div>
      </div>

      {/* Main SaaS Dashboard Layout */}
      <div className="relative z-10 mt-3 grid grid-cols-12 gap-2.5 h-[calc(100%-38px)]">
        {/* Left Side: Scheduled Email Dashboard Table (7 cols) */}
        <div className="col-span-7 flex flex-col justify-between space-y-2">
          {/* Scheduled Queue Stats Bar */}
          <div className="rounded-xl border border-border/60 bg-card/70 p-2.5 shadow-sm">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-display font-bold uppercase tracking-wider text-foreground/90 flex items-center gap-1">
                <ListOrdered size={12} className="text-lime" /> Job Dispatcher
              </span>
              <span className="font-mono text-[9px] text-lime">BullMQ Queue</span>
            </div>

            {/* Email Rows */}
            <div className="mt-2 space-y-1 text-[9px] font-mono">
              <div className="flex items-center justify-between bg-secondary/80 p-1.5 rounded border border-border/40">
                <span className="text-foreground/90 truncate max-w-[90px]">welcome_seq.ts</span>
                <span className="text-lime font-semibold">12:00 UTC</span>
                <span className="text-[8px] bg-lime/20 text-lime px-1 rounded">QUEUED</span>
              </div>
              <div className="flex items-center justify-between bg-secondary/80 p-1.5 rounded border border-border/40">
                <span className="text-foreground/90 truncate max-w-[90px]">invoice_audit.ts</span>
                <span className="text-primary font-semibold">12:15 UTC</span>
                <span className="text-[8px] bg-primary/20 text-primary px-1 rounded">WAITING</span>
              </div>
            </div>
          </div>

          {/* Infrastructure & Concurrency Status */}
          <div className="rounded-xl border border-border/60 bg-card/70 p-2 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground">
              <span>Concurrency: Active</span>
              <span className="text-lime">Upstash Redis</span>
            </div>

            {/* Persistence Callout Box */}
            <div className="mt-1 rounded-lg bg-secondary/90 p-1.5 border border-border/50 text-[9px] font-mono">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="flex items-center gap-1"><Database size={10} className="text-primary" /> PostgreSQL</span>
                <span className="text-foreground font-semibold">Prisma ORM</span>
              </div>
              <span className="text-[8px] text-muted-foreground block mt-0.5">
                Restart-Safe Persistence Layer
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[8px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1"><Send size={9} /> SMTP Worker</span>
              <span className="text-primary">Neon PostgreSQL</span>
            </div>
          </div>
        </div>

        {/* Right Side: BullMQ + Redis Worker Pipeline (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between rounded-xl border border-lime/40 bg-gradient-to-b from-lime/10 via-card/90 to-lime/5 p-2.5 shadow-md">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-display text-[10px] uppercase font-bold text-lime flex items-center gap-1">
                <Cpu size={12} className="text-lime" /> Worker Flow
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-lime animate-ping" />
            </div>
            <p className="mt-0.5 text-[8px] font-mono text-muted-foreground">
              Node.js &bull; Redis Queue
            </p>
          </div>

          {/* Micro Flow Visual Nodes */}
          <div className="my-1.5 space-y-1 text-[8px] font-mono">
            <div className="rounded bg-secondary/80 p-1 text-center border border-border/50 text-foreground font-semibold">
              API Trigger
            </div>
            <div className="text-center text-lime text-[10px] leading-none">&darr;</div>
            <div className="rounded bg-lime/15 border border-lime/30 p-1 text-center text-lime font-bold">
              BullMQ &bull; Redis
            </div>
            <div className="text-center text-lime text-[10px] leading-none">&darr;</div>
            <div className="rounded bg-secondary/80 p-1 text-center border border-border/50 text-foreground font-semibold">
              Email Worker
            </div>
          </div>

          <div className="pt-1 border-t border-lime/20 flex items-center justify-between text-[8px] font-mono text-lime">
            <span>Render Deploy</span>
            <span>&bull; Ready</span>
          </div>
        </div>
      </div>

      {/* Hover Technical Architecture Pill Overlay */}
      <div className="pointer-events-none absolute bottom-2 right-2 z-20 flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono text-lime border border-lime/30 shadow-md">
        <Sparkles size={10} className="animate-spin text-lime" />
        <span>Queue UI Concept &bull; BullMQ + Redis</span>
      </div>
    </div>
  );
}
