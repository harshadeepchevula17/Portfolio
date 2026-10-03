// Single source of truth for Chevula Harsha Deep's portfolio copy and professional information.

import mediconnectImage from "@/assets/mediconnect.png";
import emailSchedularImage from "@/assets/email_Schedular.png";
import awsCert from "@/assets/aws_cert.pdf";
import cCertificate from "@/assets/C_certificate.pdf";
import javaCertificate from "@/assets/java_Cert.pdf";
import javaDsaCertificate from "@/assets/java_dsa_harsha.pdf";

export const profile = {
  first: "CHEVULA",
  last: "HARSHA DEEP",
  fullName: "Chevula Harsha Deep",
  role: "FULL STACK DEVELOPER",
  techTagline: "Java • Spring Boot • React.js • Node.js • REST APIs",
  intro:
    "Full Stack Developer focused on building scalable web applications, backend systems, REST APIs and modern user experiences.",
  about:
    "Hi, I'm Harsha Deep, a B.E. Information Technology student and Full Stack Developer with hands-on experience building web applications using React.js, Spring Boot, Node.js, Express.js, MySQL and REST APIs.\n\nI enjoy building scalable applications, backend services, authentication systems, dashboards and real-world software solutions. I also work with Docker, Redis, PostgreSQL and modern development tools, while continuously strengthening my problem-solving and DSA skills.",
  highlights: [
    { label: "B.E. Information Technology", value: "8.75 CGPA" },
    { label: "Full Stack Development", value: "React & Spring Boot" },
    { label: "Backend & APIs", value: "Node, Express & REST" },
    { label: "DSA & Problem Solving", value: "Core Strength" },
  ],
  phone: "+91 9347464857",
  email: "harshadeepchevula17@gmail.com",
  links: {
    github: "https://github.com/harshadeepchevula17",
    linkedin: "https://www.linkedin.com/in/harsha-deep-chevula-a463342bb/",
    codechef: "https://www.codechef.com/users/harshadeep17",
    leetcode: "https://leetcode.com/u/harsha_deep-17/",
    resume: "/resume.pdf", // Placeholder: [Download Resume]
    email: "mailto:harshadeepchevula17@gmail.com",
  },
};

export const nav = [
  "Home",
  "About",
  "Projects",
  "Experience",
  "Skills",
  "Education",
  "Certifications",
  "Contact",
];

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  features: string[];
  aiFeature?: {
    name: string;
    description: string;
  };
  deployment?: string[];
  architecture: {
    nodes: string[];
    note?: string;
  };
  imageUrl?: string;
  githubUrl: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "mediconnect",
    name: "MediConnect",
    tagline: "Healthcare Platform with Role-Based Workflows & AI Assistance",
    description:
      "A production-ready full-stack healthcare platform enabling secure patient, doctor and administrator workflows through role-based dashboards and RESTful services.",
    stack: ["React.js", "Spring Boot", "MySQL", "Docker", "REST APIs"],
    features: [
      "JWT-based authentication",
      "Role-Based Access Control (RBAC)",
      "Appointment scheduling",
      "Patient record management",
      "Payment gateway integration",
      "RESTful backend services",
      "Docker containerization",
    ],
    aiFeature: {
      name: "MediAssist AI",
      description:
        "MediAssist — AI-powered virtual healthcare assistant integrated into MediConnect to provide intelligent medical guidance and improve patient engagement.",
    },
    architecture: {
      nodes: [
        "User",
        "React.js Frontend",
        "Spring Boot REST APIs",
        "Authentication / RBAC",
        "MySQL Database",
      ],
      note: "MediAssist AI ↕ Healthcare Platform",
    },
    imageUrl: mediconnectImage,
    githubUrl: "https://github.com/harshadeepchevula17/Medi-Connect",
    demoUrl: "",
  },
  {
    id: "email-scheduler",
    name: "Email Scheduler",
    tagline: "Distributed Background Job & Email Queue Processing System",
    description:
      "Production-grade email scheduling platform supporting scheduled delivery, sender management and dashboard-based tracking of scheduled and sent emails.",
    stack: [
      "Node.js",
      "TypeScript",
      "BullMQ",
      "Redis",
      "PostgreSQL",
      "Prisma",
    ],
    features: [
      "Scheduled email delivery",
      "Sender management",
      "Email tracking dashboard",
      "Restart-safe job scheduling",
      "BullMQ + Redis queues",
      "PostgreSQL data persistence",
      "Prisma ORM",
      "Transactional email lifecycle updates",
      "Rate limiting",
      "Queue-based concurrency control",
      "Google OAuth authentication",
    ],
    deployment: ["Render", "Neon PostgreSQL", "Upstash Redis"],
    architecture: {
      nodes: [
        "User",
        "Dashboard",
        "Node.js / TypeScript API",
        "BullMQ",
        "Redis Queue",
        "Email Worker",
        "Email Delivery",
      ],
      note: "Persistence Layer: PostgreSQL + Prisma ORM (Decoupled Data Store)",
    },
    imageUrl: emailSchedularImage,
    githubUrl: "https://github.com/harshadeepchevula17/outboxlabs_assignment",
    demoUrl: "",
  },
];

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  workMode: string;
  responsibilities: string[];
  technologies: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "thinklab",
    role: "Web Development Intern",
    company: "ThinkLab Digital Solutions",
    period: "Jan 2026 – Apr 2026",
    workMode: "Remote",
    responsibilities: [
      "Developed custom WordPress websites with responsive UI, theme customization, plugin integration, SEO optimization, and performance enhancements.",
      "Built a full-stack web application using React.js, Spring Boot, MySQL, and RESTful APIs with secure CRUD operations.",
    ],
    technologies: [
      "WordPress",
      "React.js",
      "Spring Boot",
      "MySQL",
      "REST APIs",
      "SEO",
      "CRUD",
    ],
  },
  {
    id: "gradientts",
    role: "Full Stack Developer Intern",
    company: "Gradientts",
    period: "May 2026 – Aug 2026",
    workMode: "Remote",
    responsibilities: [
      "Developed scalable full-stack applications using React.js, Node.js, Express.js, MySQL, and RESTful APIs with secure authentication and payment integration.",
      "Built responsive dashboards, optimized application performance, and collaborated using Git/GitLab in an Agile development environment.",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "REST APIs",
      "Authentication",
      "Payment Integration",
      "Git/GitLab",
      "Agile",
    ],
  },
];

export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "PROGRAMMING LANGUAGES",
    items: ["Java", "Python", "JavaScript", "SQL"],
  },
  {
    category: "FRONTEND",
    items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "BACKEND",
    items: ["Spring Boot", "Node.js", "Express.js", "FastAPI"],
  },
  {
    category: "DATABASES",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    category: "AI / ML",
    items: ["TensorFlow", "Scikit-learn", "NumPy", "Pandas"],
  },
  {
    category: "DEVOPS / TOOLS",
    items: ["Docker", "Git", "GitHub", "GitLab"],
  },
  {
    category: "CORE CS",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "DBMS",
      "Operating Systems",
      "Computer Networking",
    ],
  },
  {
    category: "CONCEPTS",
    items: ["REST APIs", "MVC Architecture"],
  },
];

export const dsaFundamentals = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networking",
];

export interface EducationItem {
  degree: string;
  institution: string;
  boardOrUniversity: string;
  year: string;
  score: string;
  scoreLabel: string;
  type?: string;
}

export const educationList: EducationItem[] = [
  {
    degree: "B.E. Information Technology",
    institution: "MVSR Engineering College",
    boardOrUniversity: "Osmania University",
    year: "2027",
    score: "8.75 CGPA",
    scoreLabel: "CGPA",
    type: "Full-time",
  },
  {
    degree: "12th / HSC",
    institution: "SR Junior College",
    boardOrUniversity: "State Board",
    year: "2023",
    score: "96.5%",
    scoreLabel: "Percentage",
    type: "Higher Secondary",
  },
  {
    degree: "10th / SSC",
    institution: "GHS Krishna Colony",
    boardOrUniversity: "State Board",
    year: "2021",
    score: "10.0 CGPA",
    scoreLabel: "CGPA",
    type: "Secondary School",
  },
];

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  fileUrl?: string;
}

export const certificationsList: CertificationItem[] = [
  { name: "C Programming", issuer: "NPTEL", year: "2024", fileUrl: cCertificate },
  { name: "Java Programming", issuer: "NPTEL", year: "2024", fileUrl: javaCertificate },
  { name: "Java DSA", issuer: "NPTEL", year: "2024", fileUrl: javaDsaCertificate },
  { name: "Amazon AWS", issuer: "Amazon AWS", year: "2024", fileUrl: awsCert },
];
