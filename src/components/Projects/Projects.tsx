import { motion } from "motion/react";
import { Activity, Cpu, ArrowRight } from "lucide-react";
import { projects } from "@/content/portfolio";

export function Projects() {

  const mediConnect = projects.find((p) => p.id === "mediconnect") || projects[0];
  const emailScheduler = projects.find((p) => p.id === "email-scheduler") || projects[1];

  return (
    <section id="projects" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-lime/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center md:text-left mb-10">
          <p className="eyebrow">03 — Projects</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
            Featured Engineering Projects
          </h2>
          <p className="mt-2 max-w-xl text-sm md:text-base text-muted-foreground">
            Production-grade systems designed with robust architectures, decoupled backend services, and resilient data layers. Click "Explore Project" to inspect the full case study in a new tab.
          </p>
        </div>

        {/* ========================================================
            2-CARD RESPONSIVE GRID WITH DOMINANT PROJECT VISUALS
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: MediConnect */}
          <motion.a
            href={`/projects/${mediConnect.id}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open MediConnect project details in a new tab"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group panel relative flex flex-col justify-between overflow-hidden p-5 sm:p-6 cursor-pointer border border-border/80 bg-card/75 hover:border-primary/60 hover:shadow-[0_0_35px_color-mix(in_oklab,var(--primary)_25%,transparent)] transition-all block"
          >
            <div>
              {/* LARGE PROJECT VISUAL (Top 45-55% of Card) */}
              <div className="w-full overflow-hidden rounded-xl border border-primary/20 bg-background/50 shadow-md group-hover:border-primary/40 transition-colors">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={mediConnect.imageUrl || "/assets/mediconnect.jpg"}
                    alt={mediConnect.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Category Pill & ID */}
              <div className="mt-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-[11px] font-display font-semibold tracking-wider text-primary">
                  <Activity size={13} className="text-primary" />
                  <span>HEALTHCARE + AI</span>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
                  01 / 02
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {mediConnect.name}
              </h3>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                Full-Stack Healthcare Platform
              </p>

              {/* Short Description */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                Secure healthcare platform enabling patient, doctor and administrator workflows with role-based dashboards and integrated MediAssist AI guidance.
              </p>

              {/* Primary Tech Badges */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {mediConnect.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-secondary/80 px-2.5 py-1 font-mono text-xs text-foreground/90 border border-border/50 group-hover:border-primary/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer CTA */}
            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-display font-bold tracking-wider text-primary">
              <span className="group-hover:translate-x-1 transition-transform flex items-center gap-2">
                EXPLORE PROJECT <ArrowRight size={14} />
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Opens in New Tab
              </span>
            </div>
          </motion.a>

          {/* Card 2: Email Scheduler */}
          <motion.a
            href={`/projects/${emailScheduler.id}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Email Scheduler project details in a new tab"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group panel relative flex flex-col justify-between overflow-hidden p-5 sm:p-6 cursor-pointer border border-border/80 bg-card/75 hover:border-lime/60 hover:shadow-[0_0_35px_color-mix(in_oklab,var(--lime)_25%,transparent)] transition-all block"
          >
            <div>
              {/* LARGE PROJECT VISUAL (Top 45-55% of Card) */}
              <div className="w-full overflow-hidden rounded-xl border border-lime/20 bg-background/50 shadow-md group-hover:border-lime/40 transition-colors">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={emailScheduler.imageUrl || "/images/email-scheduler-cover.jpg"}
                    alt={emailScheduler.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Category Pill & ID */}
              <div className="mt-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/10 border border-lime/30 px-3 py-1 text-[11px] font-display font-semibold tracking-wider text-lime">
                  <Cpu size={13} className="text-lime" />
                  <span>DISTRIBUTED BACKEND</span>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground group-hover:text-lime transition-colors">
                  02 / 02
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-lime transition-colors">
                {emailScheduler.name}
              </h3>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                Production-Grade Email Scheduling Platform
              </p>

              {/* Short Description */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                Production-grade asynchronous email scheduling platform with BullMQ + Redis queue processing, restart-safe job recovery, and PostgreSQL persistence.
              </p>

              {/* Primary Tech Badges */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {emailScheduler.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-secondary/80 px-2.5 py-1 font-mono text-xs text-foreground/90 border border-border/50 group-hover:border-lime/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer CTA */}
            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-display font-bold tracking-wider text-lime">
              <span className="group-hover:translate-x-1 transition-transform flex items-center gap-2">
                EXPLORE PROJECT <ArrowRight size={14} />
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Opens in New Tab
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
