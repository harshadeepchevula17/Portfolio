import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Navigation/Nav";
import { Hero } from "@/components/Hero/Hero";
import { Projects } from "@/components/Projects/Projects";
import {
  About,
  Experience,
  Skills,
  Education,
  Certifications,
  Contact,
} from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chevula Harsha Deep — Full Stack Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Chevula Harsha Deep, Full Stack Developer experienced with React.js, Spring Boot, Node.js, Express.js, MySQL, and REST APIs.",
      },
      { property: "og:title", content: "Chevula Harsha Deep — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Full Stack Developer focused on building scalable web applications, backend systems, REST APIs and modern user experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const reveal = {
    initial: { opacity: 0, y: 36, filter: "blur(8px)", borderRadius: "24px" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)", borderRadius: "0px" },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.6, ease: "easeOut" },
  } as const;

  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-foreground">
      <Nav />
      <motion.div {...reveal}>
        <Hero />
      </motion.div>
      <motion.div {...reveal}>
        <About />
      </motion.div>
      <motion.div {...reveal}>
        <Projects />
      </motion.div>
      <motion.div {...reveal}>
        <Experience />
      </motion.div>
      <motion.div {...reveal}>
        <Skills />
      </motion.div>
      <motion.div {...reveal}>
        <Education />
      </motion.div>
      <motion.div {...reveal}>
        <Certifications />
      </motion.div>
      <motion.div {...reveal}>
        <Contact />
      </motion.div>
    </main>
  );
}
