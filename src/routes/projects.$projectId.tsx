import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Github,
  ExternalLink,
  Bot,
  Activity,
  Server,
  Send,
  Inbox,
  ListOrdered,
  Layers,
  CheckCircle2,
  Cpu,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { projects, type Project } from "@/content/portfolio";
import { Chip } from "@/components/Scene/SceneSection";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.projectId);
    if (!project) {
      throw notFound();
    }
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name || "Project"} — Chevula Harsha Deep` },
      {
        name: "description",
        content: loaderData?.description || "Project engineering details and architecture.",
      },
    ],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const project = Route.useLoaderData() as Project;
  const [pipelineRun, setPipelineRun] = useState(0);

  const stages = [
    { label: "Dashboard", icon: Layers },
    { label: "BullMQ Queue", icon: ListOrdered },
    { label: "Redis Queue", icon: Server },
    { label: "Email Worker", icon: Cpu },
    { label: "SMTP Delivery", icon: Send },
    { label: "Delivered", icon: Inbox },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground antialiased py-12 px-4 sm:px-6 md:px-12 selection:bg-primary/30 selection:text-foreground">
      {/* Top Ambient Glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Navigation / Back Bar */}
        <div className="flex items-center justify-between pb-8 border-b border-border/60">
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full bg-secondary/80 px-4 py-2 text-xs font-display font-bold tracking-wider text-foreground hover:bg-secondary border border-border/60 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO PORTFOLIO</span>
          </a>

          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            CASE STUDY &bull; {project.id.toUpperCase()}
          </span>
        </div>

        {/* Project Header */}
        <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-3.5 py-1 text-xs font-display tracking-widest text-primary">
              {project.id === "mediconnect" ? (
                <>
                  <Activity size={14} className="text-primary" />
                  <span>FULL-STACK HEALTHCARE PLATFORM</span>
                </>
              ) : (
                <>
                  <Cpu size={14} className="text-lime" />
                  <span className="text-lime">DISTRIBUTED QUEUE SYSTEM</span>
                </>
              )}
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              {project.name}
            </h1>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              {project.tagline}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-2.5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-xs font-display font-bold tracking-wider text-foreground hover:bg-secondary/80 border border-border transition-colors"
            >
              <Github size={15} /> [GitHub Link]
            </a>
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-display font-bold tracking-wider text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={14} /> [Live Demo]
              </a>
            ) : (
              <span className="flex items-center gap-2 rounded-full bg-secondary/50 px-5 py-2.5 text-xs font-display tracking-wider text-muted-foreground border border-border/50">
                <ExternalLink size={13} /> [Live Demo]
              </span>
            )}
          </div>
        </div>

        {/* Large Project Visual Showcase */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/80 bg-background/60 shadow-2xl">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img
              src={project.imageUrl || `/images/${project.id}-cover.jpg`}
              alt={project.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Overview Box */}
        <div className="panel mt-8 p-6 md:p-8 border border-border/80 bg-card/80">
          <span className="eyebrow">Project Overview</span>
          <p className="mt-2 text-base md:text-lg leading-relaxed text-foreground/90">
            {project.description}
          </p>
        </div>

        {/* ========================================================
            MEDICONNECT SPECIFIC CONTENT
        ======================================================== */}
        {project.id === "mediconnect" && (
          <div className="mt-8 space-y-8">
            {/* MediAssist AI Spotlight */}
            <div className="rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-2 text-primary font-display font-bold text-sm tracking-wider uppercase">
                <Bot size={22} className="text-primary animate-pulse" />
                <span>MEDIASSIST AI</span>
              </div>
              <p className="mt-3 text-base md:text-lg text-foreground font-medium leading-relaxed">
                {project.aiFeature?.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-primary font-mono">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>AI-powered virtual healthcare guidance & engagement system</span>
              </div>
            </div>

            {/* Architecture Node Flow */}
            <div className="panel p-6 md:p-8 border border-border/80 bg-secondary/30">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Layers size={14} className="text-primary" /> Technical System Architecture
                </h3>
                <span className="text-[11px] font-mono text-lime">Role-Based & Containerized</span>
              </div>

              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 relative">
                {project.architecture.nodes.map((node, idx) => (
                  <div key={node} className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="w-full md:w-auto rounded-xl border border-border bg-card px-4 py-3 text-center shadow-md">
                      <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                        Stage 0{idx + 1}
                      </span>
                      <span className="font-display text-xs md:text-sm font-bold text-foreground">
                        {node}
                      </span>
                    </div>
                    {idx < project.architecture.nodes.length - 1 && (
                      <div className="text-primary/70 rotate-90 md:rotate-0 flex items-center justify-center">
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-mono text-primary">
                  <Bot size={14} />
                  <span>{project.architecture.note}</span>
                </div>
              </div>
            </div>

            {/* Core Features */}
            <div>
              <span className="eyebrow">Core Features</span>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.features.map((feat) => (
                  <div
                    key={feat}
                    className="panel p-4 flex items-start gap-2.5 text-xs md:text-sm text-foreground/90 border border-border/70"
                  >
                    <CheckCircle2 size={16} className="text-lime mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Implementation */}
            <div className="panel p-6 border border-border/80 bg-secondary/30">
              <span className="eyebrow">Technical Implementation</span>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                <li>&bull; <strong className="text-foreground">React.js Frontend:</strong> Responsive role-based dashboards tailored for patient, doctor, and administrator portals.</li>
                <li>&bull; <strong className="text-foreground">Spring Boot REST APIs:</strong> Modular backend service layer handling appointment scheduling, doctor availability, and records.</li>
                <li>&bull; <strong className="text-foreground">JWT & Role-Based Access Control:</strong> Secure stateless session verification ensuring strict resource segregation.</li>
                <li>&bull; <strong className="text-foreground">MySQL & Docker:</strong> Relational data models for records and Docker containerization for predictable environments.</li>
                <li>&bull; <strong className="text-foreground">MediAssist Integration:</strong> Seamlessly connected AI assistant for interactive healthcare guidance.</li>
              </ul>
            </div>
          </div>
        )}

        {/* ========================================================
            EMAIL SCHEDULER SPECIFIC CONTENT
        ======================================================== */}
        {project.id === "email-scheduler" && (
          <div className="mt-8 space-y-8">
            {/* BullMQ Pipeline */}
            <div className="panel p-6 md:p-8 border border-border/80 bg-secondary/30">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="eyebrow">Interactive Execution Pipeline</span>
                  <h3 className="mt-1 text-lg font-bold text-foreground">
                    BullMQ + Redis Worker Pipeline
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPipelineRun((r) => r + 1)}
                  className="glow rounded-full bg-primary px-4 py-2 text-xs font-display font-bold tracking-widest text-primary-foreground hover:opacity-95 active:scale-95 transition-all"
                >
                  DISPATCH TEST JOB
                </button>
              </div>

              {/* Pipeline stages */}
              <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                <div className="absolute left-[8%] right-[8%] top-7 hidden h-0.5 bg-border/80 md:block" />
                {stages.map((s, i) => (
                  <motion.div
                    key={`${s.label}-${pipelineRun}`}
                    initial={{ scale: 1 }}
                    animate={pipelineRun ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ delay: i * 0.35, duration: 0.4 }}
                    className="relative flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card/60 p-3"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                        i === stages.length - 1
                          ? "border-lime/40 bg-lime/10 text-lime"
                          : "border-primary/40 bg-primary/10 text-primary"
                      }`}
                    >
                      <s.icon size={22} />
                    </div>
                    <span className="text-center font-display text-xs font-semibold text-foreground">
                      {s.label}
                    </span>
                  </motion.div>
                ))}

                {pipelineRun > 0 &&
                  [0, 1, 2].map((k) => (
                    <motion.div
                      key={`env-${pipelineRun}-${k}`}
                      className="absolute top-6 hidden h-3.5 w-6 rounded-sm bg-lime shadow-[0_0_12px_var(--lime)] md:block"
                      initial={{ left: "6%", opacity: 0 }}
                      animate={{ left: "90%", opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 2.2, delay: k * 0.3, ease: "easeInOut" }}
                    />
                  ))}
              </div>

              {/* Persistence Layer & Deployment */}
              <div className="mt-8 pt-6 border-t border-border/70 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border/60 bg-card/60 p-4">
                  <span className="text-[11px] font-mono text-primary uppercase tracking-wider block">
                    PERSISTENCE LAYER (DECOUPLED)
                  </span>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    PostgreSQL Data Persistence + Prisma ORM
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Provides transactional email lifecycle updates, audit histories, and restart-safe job recovery.
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/60 p-4">
                  <span className="text-[11px] font-mono text-lime uppercase tracking-wider block">
                    INFRASTRUCTURE & DEPLOYMENT
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.deployment?.map((dep) => (
                      <span
                        key={dep}
                        className="rounded-lg bg-secondary px-3 py-1 font-mono text-xs text-foreground border border-border"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features Grid */}
            <div>
              <span className="eyebrow">Key Features</span>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.features.map((feat) => (
                  <div
                    key={feat}
                    className="panel p-4 flex items-start gap-2.5 text-xs md:text-sm text-foreground/90 border border-border/70"
                  >
                    <CheckCircle2 size={16} className="text-lime mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Implementation */}
            <div className="panel p-6 border border-border/80 bg-secondary/30">
              <span className="eyebrow">Technical Implementation</span>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                <li>&bull; <strong className="text-foreground">Node.js & TypeScript Backend:</strong> Strongly typed asynchronous job definitions and API endpoints.</li>
                <li>&bull; <strong className="text-foreground">BullMQ & Redis Queuing:</strong> Decoupled worker queue architecture with concurrency controls, exponential backoff retries, and rate limiting.</li>
                <li>&bull; <strong className="text-foreground">PostgreSQL & Prisma ORM:</strong> Relational schema managing sender identities, scheduled jobs, and transactional status tracking.</li>
                <li>&bull; <strong className="text-foreground">Authentication & Security:</strong> Google OAuth authentication for authenticated scheduling and sender management.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Technology Stack Badges */}
        <div className="mt-8">
          <span className="eyebrow">Complete Technology Stack</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </div>

        {/* Footer Return CTA */}
        <div className="mt-12 pt-8 border-t border-border/60 text-center">
          <a
            href="/#projects"
            className="glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-xs font-bold tracking-widest text-primary-foreground hover:opacity-95 transition-opacity"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO PORTFOLIO</span>
          </a>
        </div>
      </div>
    </main>
  );
}
