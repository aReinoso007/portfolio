export const personalInfo = {
  name: "Alex Reinoso",
  title: "Full Stack Software Engineer",
  email: "ralexjessiel@gmail.com",
  phone: "+593-99-895-2718",
  github: "https://github.com/aReinoso007",
  linkedin: "https://linkedin.com/in/alex-reinoso/",
  summary:
    "Full Stack Software Engineer with 4+ years of experience designing and building scalable web applications across research analytics, banking, and education domains. Proficient in React, Angular, TypeScript, Java Spring Boot, Node.js, and Python, with hands-on experience integrating REST and GraphQL APIs, building data-intensive systems, and working with cloud infrastructure. Bilingual (English/Spanish) with a track record of leading engineering teams, delivering complex migrations, and collaborating cross-functionally with design and product stakeholders.",
};

export const experiences = [
  {
    company: "Reframe Data",
    role: "Full Stack Software Engineer",
    period: "March 2024 – Present",
    highlights: [
      "Designed and developed scalable full-stack features for a research analytics platform using React, TypeScript, Java Spring Boot, Node.js, and Python.",
      "Built responsive, high-performance UIs from Figma designs using Tailwind CSS and modern React architecture.",
      "Integrated OpenSearch and OpenAlex APIs for advanced academic data retrieval, filtering, and analytics workflows.",
      "Developed RESTful API endpoints and backend services for data processing, aggregation, and CRUD operations.",
      "Implemented data transformation pipelines supporting interactive visualizations with Apache ECharts.",
      "Optimized query performance for large-scale datasets in PostgreSQL and OpenSearch.",
      "Consumed and integrated GraphQL APIs to reduce over-fetching and improve frontend performance.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Angular",
      "Java Spring Boot",
      "Node.js",
      "Python",
      "PostgreSQL",
      "OpenSearch",
      "GraphQL",
      "AWS",
      "Tailwind CSS",
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

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
