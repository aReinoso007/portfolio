export const personalInfo = {
  name: "Alex Reinoso",
  title: "Full Stack Developer",
  tagline:
    "I build data-rich web applications — most recently a scientific research platform aggregating 15M+ hypotheses and 116M+ researcher profiles at AllSci.",
  location: "Quito, Ecuador 🇪🇨",
  email: "ralexjessiel@gmail.com",
  phone: "+593-99-895-2718",
  github: "https://github.com/aReinoso007",
  linkedin: "https://linkedin.com/in/alex-reinoso/",
  about:
    "I'm a Full Stack Developer based in Quito, Ecuador, with a focus on building data-rich, user-facing web applications. Most recently I worked at AllSci building features for a large-scale scientific research platform used by researchers worldwide. I enjoy turning complex data into clean, intuitive interfaces and I'm currently pursuing a Master's in AI at UNIR while actively looking for my next full-time remote opportunity.",
  summary:
    "Full Stack Software Engineer with 4+ years of experience designing and building scalable web applications across research analytics, banking, and education domains. Proficient in React, Angular, TypeScript, Java Spring Boot, Node.js, and Python, with hands-on experience integrating REST and GraphQL APIs, building data-intensive systems, and working with cloud infrastructure. Bilingual (English/Spanish) with a track record of leading engineering teams, delivering complex migrations, and collaborating cross-functionally with design and product stakeholders.",
};

export const resumeDownload = {
  file: "Alex_Reinoso_CV_2026_summarized.pdf",
  filename: "Alex_Reinoso_CV_2026_summarized.pdf",
};

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  technologies: string[];
  product?: string;
  contract?: boolean;
}

export const experiences: Experience[] = [
  {
    company: "Reframe Data",
    product: "AllSci",
    role: "Full Stack Software Engineer",
    period: "March 2024 – Present",
    highlights: [
      "Built and shipped a multi-step peer review workflow used across 15M+ hypothesis records, with structured scoring across Clarity, Impact, and Prediction dimensions",
      "Implemented faceted search and filtering UI across 150M+ scientific records spanning articles, clinical trials, patents, grants, and researchers",
      "Developed AERIS AI evidence display system showing Support/Refute/Mixed scores with source citations per hypothesis",
      "Built semantic similarity scatter plot visualization for hypothesis clustering across research domains",
      "Created personalized follow/discovery system allowing users to track articles, researchers, organizations, hypotheses, and clinical trials",
      "Delivered fully responsive mobile layouts across all major app sections",
      "Contributed to researcher profile pages displaying expertise bubble charts, citation counts, and h-index scores for 116M+ researchers",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GraphQL",
      "OpenSearch",
      "PostgreSQL",
      "Apache ECharts",
    ],
  },
  {
    company: "Bayteq",
    role: "Full Stack Developer",
    period: "Feb 2022 – March 2024",
    highlights: [
      "Built and maintained Java Enterprise applications using JSF, Spring Boot, JPA/Hibernate, and Angular.",
      "Refactored and extended a loan management, reporting, and payments platform.",
      "Automated deployments using Jenkins and GitHub Actions CI/CD pipelines.",
      "Configured Keycloak for identity and access management across enterprise applications.",
      "Migrated a banking mobile app from Ionic 4 to Ionic 6 (Cordova to Capacitor) with zero regression.",
      "Led a cross-functional team of frontend and backend engineers, coordinating sprints and delivery.",
    ],
    technologies: [
      "Java Spring Boot",
      "Angular",
      "Oracle SQL",
      "Keycloak",
      "Jenkins",
      "GitHub Actions",
      "Ionic",
      "Capacitor",
    ],
  },
  {
    company: "Coding Temple",
    role: "Frontend Curriculum Designer",
    period: "Nov 2023 – Feb 2024",
    contract: true,
    highlights: [
      "Designed a comprehensive frontend engineering curriculum focused on React and TypeScript.",
      "Created educational content covering hooks, state management, GraphQL, routing, and modern React patterns.",
      "Conducted technical training sessions and mentored students in frontend best practices.",
      "Implemented CI/CD workflows using GitHub Actions with automated deployment to Vercel.",
    ],
    technologies: ["React", "TypeScript", "GraphQL", "Jest", "GitHub Actions", "Vercel"],
  },
];

export const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "TypeScript", "Angular", "Vite", "Tailwind CSS", "Redux", "Apache ECharts", "Figma"],
  },
  {
    name: "Backend",
    skills: ["Java Spring Boot", "Node.js", "Python", "REST API", "SOAP", "GraphQL", "Hibernate"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "Oracle SQL", "OpenSearch", "Supabase"],
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS", "GitHub Actions", "Vercel", "Grafana", "Git", "SCRUM", "Jira"],
  },
  {
    name: "AI-Assisted Dev",
    skills: ["Claude", "Cursor", "GitHub Copilot"],
  },
  {
    name: "Auth & Integrations",
    skills: ["Keycloak", "OpenAlex", "OpenSearch", "Jasper Reports"],
  },
];

export const education = [
  {
    degree: "Master's in Artificial Intelligence",
    institution: "Universidad Internacional de La Rioja (UNIR)",
    status: "In progress",
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Polytechnical Salesian University – Ecuador",
    status: "GPA: 3.8 · Mention in Software Development",
  },
];

export const certifications = [
  "RESTful Java Spring Boot – The Project Management Institute (2023)",
  "Java Spring Boot – Scrum Learning Society (2023)",
  "IoT Fundamentals: Big Data & Analytics – Cisco Networking Academy (2020)",
];

export const languages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "Bilingual (Professional)" },
];

export interface ProjectScreenshot {
  src: string;
  caption: string;
}

const allsciScreenshots: ProjectScreenshot[] = [
  { src: "allsci_images/explore-dashboard.webp", caption: "Explore dashboard — Search, Browse, Chat & Visualize" },
  { src: "allsci_images/browse-desktop.webp", caption: "Browse — all content categories at a glance" },
  { src: "allsci_images/hypotheses-browse.webp", caption: "15.1M hypotheses with advanced faceted filtering" },
  { src: "allsci_images/hypothesis-evidence.webp", caption: "AERIS AI-powered hypothesis evidence scoring" },
  { src: "allsci_images/peer-review-step1.webp", caption: "Peer review: guidelines & acceptance" },
  { src: "allsci_images/peer-review-step2.webp", caption: "Peer review: structured rating form (Clarity & Impact)" },
  { src: "allsci_images/peer-review-step3.webp", caption: "Peer review: scoring with rationale" },
  { src: "allsci_images/peer-review-preview.webp", caption: "Peer review: preview before submission" },
  { src: "allsci_images/peer-review-success.webp", caption: "Peer review submitted — CV auto-updated" },
  { src: "allsci_images/search-results.webp", caption: "Multi-type search across 150M+ records" },
  { src: "allsci_images/researcher-profile.webp", caption: "Researcher profiles with expertise visualization" },
  { src: "allsci_images/article-detail.webp", caption: "Article detail with author institution network" },
  { src: "allsci_images/semantic-similarity.webp", caption: "Semantic similarity scatter plot" },
  { src: "allsci_images/follow-explore.webp", caption: "Personalized research discovery feed" },
  { src: "allsci_images/follow-search.webp", caption: "Live keyword search with highlighted results" },
  { src: "allsci_images/follow-manage.webp", caption: "Manage followed content across all categories" },
  { src: "allsci_images/clinical-trial.webp", caption: "Clinical trial overview & participation criteria" },
  { src: "allsci_images/clinical-trial-design.webp", caption: "Study design, arms & outcome measures" },
  { src: "allsci_images/browse-mobile.webp", caption: "Fully responsive mobile experience" },
];

export interface Project {
  id: string;
  name: string;
  role?: string;
  badges?: string[];
  description: string;
  highlights?: string[];
  url?: string;
  github?: string | null;
  technologies: string[];
  screenshots: ProjectScreenshot[];
}

export const projects: Project[] = [
  {
    id: "allsci",
    name: "AllSci",
    role: "Full Stack Developer · Reframe Data",
    description:
      "Full-stack scientific research platform aggregating 15M+ hypotheses, 1.7M peer-reviewed articles, 1.1M clinical trials, 5.5M patents, and 116M+ researcher profiles. Built key features including a multi-step peer review workflow, AERIS AI evidence scoring display, faceted search with advanced filtering, semantic similarity visualizations, a personalized follow/discovery system, and fully responsive mobile layouts.",
    url: "https://app.allsci.com/browse",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    screenshots: allsciScreenshots,
  },
  {
    id: "marlex",
    name: "Marlex",
    badges: ["🛠️ In Development · Ecuador", "👥 Co-Founder"],
    description:
      "Multi-tenant marketplace platform for businesses in Ecuador. Any visitor can browse the public catalog, add products to a cart (as a guest or with an account), and check out; sellers manage one or more stores with their own products, categories, customers, orders, and collaborators; and a system administrator oversees the entire platform.",
    highlights: [
      "Public storefront per store at marlex.com/tienda/{slug}, with guest and authenticated checkout flows",
      "Multi-store seller dashboard covering products, categories, customers, orders, and collaborators",
      "Platform-level admin role with oversight across all stores and sellers",
      "Turborepo + pnpm workspaces monorepo with a Vite + React 19 + TypeScript frontend",
      "Data layer built with TanStack Query and graphql-request against a NestJS + GraphQL API",
      "PostgreSQL as the relational store for products, orders, and multi-tenant store data",
    ],
    github: null,
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "GraphQL",
      "NestJS",
      "PostgreSQL",
      "Turborepo",
      "pnpm",
    ],
    screenshots: [],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
