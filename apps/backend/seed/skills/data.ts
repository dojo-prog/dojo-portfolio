import { SkillCategory } from "@dojo-portfolio/shared";

type MockSkill = {
  name: string;
  category: SkillCategory;
};

export const mockSkills: MockSkill[] = [
  // Language
  {
    name: "TypeScript",
    category: "language",
  },
  {
    name: "JavaScript",
    category: "language",
  },
  {
    name: "Python",
    category: "language",
  },
  {
    name: "SQL",
    category: "language",
  },

  // Frontend
  {
    name: "React",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
  },
  {
    name: "HTML",
    category: "frontend",
  },
  {
    name: "CSS",
    category: "frontend",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
  },
  {
    name: "Express",
    category: "backend",
  },
  {
    name: "REST API",
    category: "backend",
  },

  // Mobile
  {
    name: "React Native",
    category: "mobile",
  },
  {
    name: "Expo",
    category: "mobile",
  },

  // Desktop
  {
    name: "Electron",
    category: "desktop",
  },

  // Database
  {
    name: "PostgreSQL",
    category: "database",
  },
  {
    name: "Supabase",
    category: "database",
  },
  {
    name: "Redis",
    category: "database",
  },

  // Cloud
  {
    name: "AWS",
    category: "cloud",
  },
  {
    name: "Vercel",
    category: "cloud",
  },

  // DevOps
  {
    name: "Docker",
    category: "devops",
  },
  {
    name: "GitHub Actions",
    category: "devops",
  },
  {
    name: "CI/CD",
    category: "devops",
  },

  // Testing
  {
    name: "Vitest",
    category: "testing",
  },
  {
    name: "Jest",
    category: "testing",
  },
  {
    name: "Playwright",
    category: "testing",
  },

  // Security
  {
    name: "JWT",
    category: "security",
  },
  {
    name: "OAuth 2.0",
    category: "security",
  },

  // Data
  {
    name: "Data Structures",
    category: "data",
  },
  {
    name: "Data Modeling",
    category: "data",
  },

  // AI
  {
    name: "OpenAI API",
    category: "ai",
  },
  {
    name: "LangChain",
    category: "ai",
  },

  // Tools
  {
    name: "Git",
    category: "tools",
  },
  {
    name: "GitHub",
    category: "tools",
  },
  {
    name: "Postman",
    category: "tools",
  },

  // Other
  {
    name: "Agile",
    category: "other",
  },
];
