import { useRef, useState, type FormEvent } from "react";
import type { IconType } from "react-icons";
import {
  SiOpenjdk,
  SiPython,
  SiJavascript,
  SiSqlite,
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiSpringboot,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMysql,
  SiPostgresql,
  SiTensorflow,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiDocker,
  SiGit,
  SiGithub,
  SiGitlab,
  SiCodeberg,
  SiH2Database,
} from "react-icons/si";
import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Award,
  Phone,
  Calendar,
  MapPin,
  CheckCircle2,
  Send,
  GraduationCap,
  BookOpenText,
  Code2,
  Trophy,
} from "lucide-react";
import eduImg from "@/assets/scene-education.jpg";
import contactImg from "@/assets/scene-contact.jpg";
import { SceneSection } from "@/components/Scene/SceneSection";
import {
  profile,
  experiences,
  skillCategories,
  educationList,
  certificationsList,
} from "@/content/portfolio";

export { About } from "@/components/About/About";



// ========================================================
// 2. EXPERIENCE SECTION (Compact Recruiter-Friendly Career Timeline)
// ========================================================
export function Experience() {
  return (
    <section id="experience" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center md:text-left">
          <p className="eyebrow">04 — Professional Experience</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
            Career Timeline
          </h2>
          <p className="mt-2 max-w-xl text-sm md:text-base text-muted-foreground">
            Hands-on software development experience building scalable web applications, RESTful APIs, and secure production solutions.
          </p>
        </div>

        {/* Compact Vertical Timeline Container */}
        <div className="relative mt-12">
          {/* Glowing Center Line for Desktop (left 140px on md+, left 18px on mobile) */}
          <div className="absolute left-[18px] md:left-[140px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-primary/20 shadow-[0_0_10px_var(--primary)]" />

          <div className="space-y-8 md:space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col md:flex-row items-start"
              >
                {/* 1. LEFT SIDE: Date / Period (Desktop only, mobile shows inside card) */}
                <div className="hidden md:block w-[120px] shrink-0 pt-2 text-right pr-6">
                  <span className="font-mono text-xs font-bold text-foreground block">
                    {exp.period.split("–")[0]?.trim()}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground block">
                    {exp.period.split("–")[1]?.trim()}
                  </span>
                </div>

                {/* 2. CENTER: Glowing Timeline Node */}
                <div className="absolute left-[10px] md:left-[132px] top-3.5 z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-primary bg-background shadow-[0_0_12px_var(--primary)]">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </div>

                {/* 3. RIGHT SIDE: Compact Experience Content Card */}
                <div className="ml-10 md:ml-10 w-full flex-1">
                  <div className="panel p-5 md:p-6 border border-border/70 bg-card/80 hover:border-primary/40 transition-colors shadow-lg">
                    {/* Header: Role (Prominent) + Company */}
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/50 pb-3">
                      <div>
                        {/* ROLE IS VISUALLY PROMINENT */}
                        <h3 className="font-display text-base md:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>{exp.role.toUpperCase()}</span>
                        </h3>
                        <p className="mt-0.5 text-sm md:text-base font-semibold text-foreground/80">
                          {exp.company}
                        </p>
                      </div>

                      {/* Meta badges: Period & Remote mode */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                        <div className="flex items-center gap-1 rounded-md bg-secondary/80 px-2.5 py-1 border border-border/50">
                          <Calendar size={12} className="text-primary" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-md bg-secondary/80 px-2.5 py-1 border border-border/50">
                          <MapPin size={12} className="text-lime" />
                          <span>{exp.workMode}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Responsibilities */}
                    <div className="mt-3.5">
                      <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground block mb-1.5 font-bold">
                        KEY RESPONSIBILITIES
                      </span>
                      <ul className="space-y-1.5">
                        {exp.responsibilities.map((resp, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs md:text-sm text-foreground/90 leading-relaxed"
                          >
                            <CheckCircle2
                              size={14}
                              className="text-lime mt-0.5 shrink-0"
                            />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technology Stack */}
                    <div className="mt-4 pt-3 border-t border-border/40">
                      <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground block mb-2 font-bold">
                        TECHNOLOGY STACK
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-secondary/90 px-2.5 py-0.5 font-mono text-[11px] text-foreground/90 border border-border/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const technologyIcons: Record<string, IconType> = {
  Java: SiOpenjdk,
  Python: SiPython,
  "JavaScript": SiJavascript,
  SQL: SiSqlite,
  "React.js": SiReact,
  "HTML5": SiHtml5,
  "CSS3": SiCss,
  "Tailwind CSS": SiTailwindcss,
  "Spring Boot": SiSpringboot,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "FastAPI": SiFastapi,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  TensorFlow: SiTensorflow,
  "Scikit-learn": SiScikitlearn,
  NumPy: SiNumpy,
  Pandas: SiPandas,
  Docker: SiDocker,
  Git: SiGit,
  "GitHub": SiGithub,
  GitLab: SiGitlab,
  "Data Structures & Algorithms": SiCodeberg,
  "Object-Oriented Programming": SiCodeberg,
  DBMS: SiH2Database,
  "Operating Systems": SiCodeberg,
  "Computer Networking": SiCodeberg,
  "REST APIs": SiCodeberg,
  "MVC Architecture": SiCodeberg,
};

const primaryStack = [
  { name: "Java", category: "Programming Language" },
  { name: "Spring Boot", category: "Backend" },
  { name: "React.js", category: "Frontend" },
  { name: "Node.js", category: "Runtime" },
  { name: "REST APIs", category: "Architecture" },
  { name: "MySQL", category: "Database" },
  { name: "Docker", category: "DevOps" },
];

const filterOptions = [
  { label: "ALL", value: "ALL" },
  { label: "DEVELOPMENT", value: "DEVELOPMENT" },
  { label: "DATA", value: "DATA" },
  { label: "AI / ML", value: "AI / ML" },
  { label: "DEVOPS", value: "DEVOPS / TOOLS" },
  { label: "CORE CS", value: "CORE CS" },
];

const categoryMeta: Record<string, { label: string; accent: string }> = {
  "PROGRAMMING LANGUAGES": { label: "Language Layer", accent: "text-cyan-300" },
  FRONTEND: { label: "Interface Layer", accent: "text-sky-300" },
  BACKEND: { label: "Service Layer", accent: "text-teal-300" },
  DATABASES: { label: "Data Layer", accent: "text-violet-300" },
  "AI / ML": { label: "Intelligence Layer", accent: "text-amber-300" },
  "DEVOPS / TOOLS": { label: "Delivery Layer", accent: "text-lime-300" },
  "CORE CS": { label: "Systems Layer", accent: "text-fuchsia-300" },
  CONCEPTS: { label: "Design Layer", accent: "text-rose-300" },
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const displayedCategories =
    selectedCategory === "ALL"
      ? skillCategories
      : skillCategories.filter((c) => {
          if (selectedCategory === "DEVELOPMENT") {
            return ["PROGRAMMING LANGUAGES", "FRONTEND", "BACKEND", "CONCEPTS"].includes(c.category);
          }
          if (selectedCategory === "DATA") {
            return ["DATABASES", "CONCEPTS"].includes(c.category);
          }
          return c.category === selectedCategory;
        });

  return (
    <section id="skills" className="relative py-20 md:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <p className="eyebrow">03 / SKILLS</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">TECHNOLOGY STACK</h2>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-muted-foreground">
            Technologies I use to design, build and ship software.
          </p>
        </div>

        <div className="mb-10 rounded-3xl border border-primary/20 bg-card/60 p-4 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-sm md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="font-display text-[10px] uppercase tracking-[0.32em] text-primary/90">PRIMARY STACK</span>
            <span className="hidden text-[10px] font-mono text-muted-foreground md:inline">Core engineering ecosystem</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
            {primaryStack.map((item, index) => {
              const Icon = technologyIcons[item.name] ?? GenericCodeIcon;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background/80 p-4 shadow-lg shadow-black/10 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.16)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-secondary/60 shadow-inner shadow-black/20">
                    <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="mt-4">
                    <div className="font-display text-lg font-semibold tracking-tight text-foreground">{item.name}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{item.category}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setSelectedCategory(filter.value)}
              className={`rounded-full border px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.22em] transition-all duration-200 ${
                selectedCategory === filter.value
                  ? "border-primary/60 bg-primary/10 text-primary shadow-[0_0_18px_rgba(34,211,238,0.14)]"
                  : "border-border/70 bg-secondary/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {displayedCategories.map((category, index) => {
            const meta = categoryMeta[category.category] ?? { label: "Technology Layer", accent: "text-cyan-300" };

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-2xl border border-border/70 bg-card/50 p-4 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                  <div>
                    <div className="font-display text-[10px] uppercase tracking-[0.28em] text-primary">{category.category}</div>
                    <div className={`mt-1 text-[10px] uppercase tracking-[0.2em] ${meta.accent}`}>{meta.label}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {category.items.map((item) => {
                    const Icon = technologyIcons[item] ?? GenericCodeIcon;

                    return (
                      <motion.div
                        key={item}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="group relative overflow-hidden rounded-xl border border-border/60 bg-background/75 p-2.5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-[0_0_22px_rgba(34,211,238,0.12)]"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/50">
                            <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium text-[12px] text-foreground transition-colors duration-200 group-hover:text-primary">{item}</div>
                            <div className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                              {category.category === "FRONTEND"
                                ? "Frontend"
                                : category.category === "BACKEND"
                                  ? "Backend"
                                  : category.category === "DATABASES"
                                    ? "Database"
                                    : category.category === "AI / ML"
                                      ? "AI / ML"
                                      : category.category === "DEVOPS / TOOLS"
                                        ? "DevOps"
                                        : category.category === "CORE CS"
                                          ? "Systems"
                                          : category.category === "PROGRAMMING LANGUAGES"
                                            ? "Language"
                                            : "Concept"}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ========================================================
// 4. EDUCATION SECTION (Premium Editorial Academic Journey)
// ========================================================
export function Education() {
  return (
    <section id="education" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-primary/8 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyan-500/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <p className="eyebrow">06 — Education</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              Education
            </h2>
            <p className="mt-3 max-w-lg text-sm md:text-base text-muted-foreground">
              The foundation behind my technical journey.
            </p>

            <div className="relative mt-8 overflow-hidden rounded-[28px] border border-border/70 bg-gradient-to-br from-card/90 via-background/90 to-primary/5 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.35)]">
              <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full border border-primary/20 bg-primary/5 blur-2xl" />
              <div className="absolute bottom-0 right-5 h-24 w-24 rounded-full border border-primary/15 bg-cyan-500/10 blur-2xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/8 text-primary shadow-[0_0_25px_rgba(34,211,238,0.18)]">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.28em] text-primary/80">
                    Academic path
                  </p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    Information Technology
                  </p>
                </div>
              </div>

              <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-background/60 p-3">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <BookOpenText className="h-3.5 w-3.5 text-primary" />
                    Learning
                  </div>
                  <p className="mt-2 text-lg font-semibold text-foreground">Engineering</p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-background/60 p-3">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 text-lime" />
                    Timeline
                  </div>
                  <p className="mt-2 text-lg font-semibold text-foreground">2021 — 2027</p>
                </div>
              </div>

              <div className="relative mt-6 overflow-hidden rounded-[22px] border border-border/70 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),transparent_52%),linear-gradient(135deg,rgba(15,23,42,0.85),rgba(2,6,23,0.94))] p-4">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:22px_22px]" />

                <div className="relative flex h-32 items-center justify-center">
                  <div className="absolute left-3 top-5 h-10 w-10 rounded-2xl border border-primary/20 bg-primary/5" />
                  <div className="absolute right-5 top-7 h-12 w-12 rotate-12 rounded-2xl border border-border/60 bg-background/40" />
                  <div className="absolute left-10 bottom-4 h-8 w-8 rounded-full border border-primary/20 bg-primary/10" />
                  <div className="absolute right-10 bottom-5 h-9 w-9 rounded-xl border border-border/60 bg-background/50" />

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-[30px] border border-primary/20 bg-background/40 text-primary shadow-[0_0_30px_rgba(34,211,238,0.22)] backdrop-blur-sm">
                    <GraduationCap className="h-10 w-10" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[18px] top-3 bottom-3 hidden w-px bg-gradient-to-b from-primary/15 via-primary/55 to-primary/10 md:block" />

            <div className="space-y-5">
              {educationList.map((item, index) => (
                <motion.article
                  key={item.degree}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="relative md:pl-10"
                >
                  <div className="absolute left-0 top-7 hidden h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background shadow-[0_0_14px_rgba(34,211,238,0.35)] md:flex">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>

                  <div className="rounded-[26px] border border-border/70 bg-card/75 p-5 shadow-[0_18px_50px_rgba(2,6,23,0.34)] backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.14)] md:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-secondary/80 text-primary">
                          <BookOpenText className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-display text-[10px] uppercase tracking-[0.26em] text-primary/80">
                            {item.type}
                          </p>
                          <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                            {item.degree}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-primary/15 bg-primary/5 px-3 py-2 text-right">
                        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/75">
                          {item.year}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-sm text-foreground/80">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-background/60">
                            <Calendar className="h-3.5 w-3.5 text-cyan-300" />
                          </span>
                          <span>{item.boardOrUniversity}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-foreground/80">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-background/60">
                            <Award className="h-3.5 w-3.5 text-lime" />
                          </span>
                          <span>
                            {item.score} <span className="text-muted-foreground">({item.scoreLabel})</span>
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border/70 bg-background/50 px-3 py-2 text-left md:text-right">
                        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          {item.scoreLabel}
                        </div>
                        <div className="mt-1 text-lg font-bold text-foreground">{item.score}</div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================================
// 5. CERTIFICATIONS SECTION
// ========================================================
export function Certifications() {
  return (
    <section id="certifications" className="relative mx-auto max-w-7xl px-5 py-20">
      <p className="eyebrow">07 — Certifications</p>
      <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
        Certificates & Credentials
      </h2>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        Verified certifications across programming languages, cloud architecture, and data structures.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {certificationsList.map((c, k) => (
          <motion.a
            key={c.name}
            href={c.fileUrl || "#"}
            target={c.fileUrl ? "_blank" : undefined}
            rel={c.fileUrl ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: k * 0.08 }}
            className="panel flex flex-col justify-between p-5 border border-border/80 hover:border-primary transition-colors block"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <Award size={20} />
              </div>
              <p className="mt-4 font-display text-sm font-bold leading-snug text-foreground">
                {c.name}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>{c.issuer}</span>
              <span className="text-primary font-semibold">{c.year}</span>
            </div>

            {c.fileUrl && (
              <div className="mt-4 text-[10px] uppercase tracking-[0.22em] text-primary font-display">
                View Certificate
              </div>
            )}
          </motion.a>
        ))}
      </div>
    </section>
  );
}

// ========================================================
// 6. CONTACT SECTION (Recruiter Contact & Client-Side Form)
// ========================================================
export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatusMessage({ type: "error", text: "Please fill in your name, email, and message." });
      return;
    }

    if (honeypotRef.current?.value) {
      setStatusMessage({ type: "error", text: "Invalid submission." });
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    try {
      const apiUrl = "/api/contact";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

      if (!response.ok || result?.success !== true) {
        throw new Error(result?.message || "Unable to send your message right now.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setStatusMessage({ type: "success", text: "Message sent successfully. I will reply shortly." });
    } catch (error) {
      setSubmitted(false);
      setStatusMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Unable to send your message right now.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const actionLinks = [
    { label: "EMAIL ME", href: profile.links.email, icon: Mail, detail: profile.email },
    { label: "PHONE", href: `tel:${profile.phone.replace(/\s+/g, "")}`, icon: Phone, detail: profile.phone },
    { label: "LINKEDIN", href: profile.links.linkedin, icon: Linkedin, detail: "LinkedIn Profile" },
    { label: "GITHUB", href: profile.links.github, icon: Github, detail: "GitHub Profile" },
    { label: "CODECHEF", href: profile.links.codechef, icon: Trophy, detail: "CodeChef Profile" },
    { label: "LEETCODE", href: profile.links.leetcode, icon: Code2, detail: "LeetCode Profile" },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column: Contact details & Form */}
          <div>
            <p className="eyebrow">08 — Contact & Connect</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              Let's Build Something Together.
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              I am open to Full Stack Developer opportunities, backend roles, and software engineering internships. Feel free to reach out directly or drop a message below.
            </p>

            {/* Quick Contact Info Cards */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {actionLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") || l.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") || l.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                  className="panel flex items-center gap-3.5 p-4 transition-all hover:border-primary hover:bg-secondary/70 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <l.icon size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block font-display text-xs font-bold tracking-wider text-foreground">
                      {l.label}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground font-mono">
                      {l.detail}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Resume Download Banner */}
            <div className="mt-4 rounded-2xl border border-primary/40 bg-primary/5 p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-display text-xs uppercase tracking-wider text-primary font-bold block">
                  Official Resume Document
                </span>
                <span className="text-xs text-muted-foreground">
                  Available in standard PDF format for recruiters
                </span>
              </div>
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-display text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <FileText size={14} /> [Download Resume]
              </a>
            </div>

            {/* Contact Form */}
            <div className="panel mt-8 p-6 md:p-8 border border-border/90 bg-card/85">
              <h3 className="text-lg font-bold font-display text-foreground">Send a Message</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Fill in the details below to initiate contact.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-xl border border-lime/30 bg-lime/10 p-5 text-center">
                  <CheckCircle2 size={32} className="mx-auto text-lime mb-2" />
                  <p className="font-display text-sm font-bold text-foreground">
                    Message form submitted successfully.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Thank you for reaching out! You can also contact directly via{" "}
                    <a href={profile.links.email} className="text-primary underline">
                      {profile.email}
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 rounded-full bg-secondary px-4 py-1.5 text-xs font-display font-medium text-foreground hover:bg-secondary/80"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full rounded-xl border border-border/80 bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full rounded-xl border border-border/80 bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Harsha, I would like to discuss a role..."
                      className="w-full rounded-xl border border-border/80 bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>

                  <input
                    ref={honeypotRef}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                  />

                  {statusMessage && (
                    <p className="text-xs text-muted-foreground" aria-live="polite">
                      {statusMessage.text}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="glow flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-display text-xs font-bold tracking-widest text-primary-foreground hover:opacity-95 disabled:opacity-50 transition-all active:scale-98"
                  >
                    <Send size={14} />
                    <span>{submitting ? "Sending..." : "SEND MESSAGE"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Character Art & Footer Signoff */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <img
                src={contactImg}
                alt="Harsha waving goodbye"
                loading="lazy"
                width={1024}
                height={1280}
                className="mx-auto max-h-[70vh] w-auto [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_75%)]"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-display text-lg font-bold text-foreground">
                Chevula Harsha Deep
              </p>
              <p className="text-xs font-mono text-primary mt-0.5">
                Full Stack Developer • B.E. Information Technology
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                © {new Date().getFullYear()} Chevula Harsha Deep. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
