import { motion } from "motion/react";
import type { ReactNode } from "react";

/** A full-bleed cartoon-world scene with the avatar artwork and overlaid HTML content. */
export function SceneSection({
  id,
  image,
  alt,
  eyebrow,
  title,
  children,
  align = "left",
}: {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <section id={id} className="relative overflow-hidden py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative overflow-hidden rounded-3xl"
        >
          <img src={image} alt={alt} loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 scene-fade" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`relative z-10 -mt-16 md:-mt-40 md:max-w-xl ${align === "right" ? "md:ml-auto" : ""}`}
        >
          <div className="panel p-6 md:p-8">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h2>
            <div className="mt-5">{children}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full border bg-secondary px-3 py-1 text-sm text-secondary-foreground">{children}</span>;
}
