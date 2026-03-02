export interface Certification {
  id: string;
  title: string;
  organization: string;
  year: number;
  skills: string[];
  verifyUrl: string;
  domain: "Frontend" | "Backend" | "AI & ML" | "Full-Stack" | "Data Science" | "DevOps";
  color: string;
}

export const certifications: Certification[] = [
  {
    id: "fcc-rwd",
    title: "Responsive Web Design",
    organization: "freeCodeCamp",
    year: 2022,
    domain: "Frontend",
    color: "#0A0A23",
    skills: [
      "Semantic HTML5 document structure",
      "CSS layouts: Flexbox & CSS Grid",
      "Mobile-first responsive design",
      "Accessibility best practices (WCAG)",
    ],
    verifyUrl: "https://www.freecodecamp.org/certification/AbdelhamidRamdaniDz/responsive-web-design",
  },
  {
    id: "fcc-js",
    title: "JavaScript Algorithms & Data Structures",
    organization: "freeCodeCamp",
    year: 2022,
    domain: "Full-Stack",
    color: "#0A0A23",
    skills: [
      "ES6+ JavaScript features",
      "Algorithmic thinking & problem solving",
      "Data structures: arrays, objects, trees",
      "Recursion & functional programming",
    ],
    verifyUrl: "https://www.freecodecamp.org/certification/AbdelhamidRamdaniDz/javascript-algorithms-and-data-structures",
  },
  {
    id: "fcc-frontend-libs",
    title: "Front End Development Libraries",
    organization: "freeCodeCamp",
    year: 2023,
    domain: "Frontend",
    color: "#0A0A23",
    skills: [
      "React component architecture",
      "Redux state management",
      "Bootstrap CSS framework",
      "React Router / routing patterns",
    ],
    verifyUrl: "https://www.freecodecamp.org/certification/AbdelhamidRamdaniDz/front-end-development-libraries",
  },
  {
    id: "fcc-backend",
    title: "Back End Development & APIs",
    organization: "freeCodeCamp",
    year: 2023,
    domain: "Backend",
    color: "#0A0A23",
    skills: [
      "Node.js runtime & event loop",
      "Express.js REST API design",
      "MongoDB CRUD operations",
      "Authentication with JWT",
    ],
    verifyUrl: "https://www.freecodecamp.org/certification/AbdelhamidRamdaniDz/back-end-development-and-apis",
  },
  {
    id: "fcc-data-python",
    title: "Data Analysis with Python",
    organization: "freeCodeCamp",
    year: 2023,
    domain: "Data Science",
    color: "#0A0A23",
    skills: [
      "NumPy & Pandas for data manipulation",
      "Matplotlib & Seaborn visualization",
      "Statistical analysis methods",
      "Data cleaning & preprocessing pipelines",
    ],
    verifyUrl: "https://www.freecodecamp.org/certification/AbdelhamidRamdaniDz/data-analysis-with-python-v7",
  },
  {
    id: "fcc-ml",
    title: "Machine Learning with Python",
    organization: "freeCodeCamp",
    year: 2024,
    domain: "AI & ML",
    color: "#0A0A23",
    skills: [
      "Supervised & unsupervised learning",
      "TensorFlow & Keras neural networks",
      "Classification, regression, clustering",
      "Model evaluation & cross-validation",
    ],
    verifyUrl: "https://www.freecodecamp.org/certification/AbdelhamidRamdaniDz/machine-learning-with-python-v7",
  },
];

export function getCertsByDomain(domain: Certification["domain"] | "All"): Certification[] {
  if (domain === "All") return certifications;
  return certifications.filter((c) => c.domain === domain);
}
