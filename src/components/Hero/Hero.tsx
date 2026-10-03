import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, FileText, Send, Sparkles } from "lucide-react";
import avatar from "@/assets/avatar-base.jpg";
import { profile } from "@/content/portfolio";

export function Hero() {
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [firstText, setFirstText] = useState(reducedMotion ? profile.first : "");
  const [lastText, setLastText] = useState(reducedMotion ? profile.last : "");

  useEffect(() => {
    if (reducedMotion) return;

    let firstIndex = 0;
    let lastIndex = 0;

    const firstTimer = window.setInterval(() => {
      firstIndex += 1;
      setFirstText(profile.first.slice(0, firstIndex));
      if (firstIndex >= profile.first.length) {
        window.clearInterval(firstTimer);
      }
    }, 90);

    const lastTimer = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        lastIndex += 1;
        setLastText(profile.last.slice(0, lastIndex));
        if (lastIndex >= profile.last.length) {
          window.clearInterval(interval);
        }
      }, 90);
    }, 320);

    return () => {
      window.clearInterval(firstTimer);
      window.clearTimeout(lastTimer);
    };
  }, [reducedMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-background pt-16 md:pt-0"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_55%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_65%)]" />
      <div className="pointer-events-none absolute top-1/4 left-10 h-72 w-72 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-12 md:grid-cols-2 md:py-20">
        {/* Left Column: Bio & Hero Details */}
        <div className="order-2 z-10 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-display tracking-widest text-primary"
          >
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>FULL STACK DEVELOPER</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl leading-[0.92]"
          >
            <span className="inline-block min-h-[1.1em]">{firstText}</span>
            <br />
            <span className="text-muted-foreground inline-block min-h-[1.1em]">
              {lastText}
              {!reducedMotion && lastText.length < profile.last.length && (
                <span className="ml-1 inline-block h-[0.9em] w-[0.08em] animate-pulse bg-foreground align-middle" />
              )}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-5 inline-block rounded-xl border border-border/80 bg-secondary/60 px-4 py-2 text-xs font-mono tracking-wide text-foreground/90"
          >
            {profile.techTagline}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-5 max-w-lg text-base md:text-lg leading-relaxed text-muted-foreground"
          >
            {profile.intro}
          </motion.p>

          {/* 3 Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-xs font-bold tracking-widest text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <span>VIEW PROJECTS</span>
              <ArrowDown size={14} />
            </a>

            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 font-display text-xs font-bold tracking-widest text-foreground transition-all hover:border-primary hover:bg-secondary"
            >
              <FileText size={14} className="text-primary" />
              <span>VIEW RESUME</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-transparent px-5 py-3 font-display text-xs font-bold tracking-widest text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/40"
            >
              <Send size={13} />
              <span>CONTACT ME</span>
            </a>
          </motion.div>

          {/* Quick Info bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-6 border-t border-border/60 pt-5 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime animate-ping" />
              <span className="text-foreground/90 font-medium">B.E. IT • 8.75 CGPA</span>
            </div>
            <div>
              <span className="text-muted-foreground">Available for Roles & Internships</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Character Art with existing walk-in animation */}
        <div className="relative order-1 flex h-[50vh] items-end justify-center md:order-2 md:h-[85vh]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 md:h-96 md:w-96 rounded-full bg-primary/10 blur-[90px]" />
          </div>
          <img
            src={avatar}
            alt="Cartoon 3D avatar of Harsha walking toward the viewer"
            width={1024}
            height={1536}
            className="animate-walk-in relative z-10 h-full w-auto origin-bottom object-contain [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_80%)]"
          />
        </div>
      </div>
    </section>
  );
}
