import type { Project } from "@dojo-portfolio/shared";

export const mockProjects: Partial<Project>[] = [
  {
    title: "Devfolio",
    slug: "devfolio",
    short_description:
      "A personal developer portfolio with project showcases, experience, and contact management.",
    description:
      "A full-stack portfolio application designed to showcase software projects, technical skills, professional experience, and education. It includes a protected dashboard for managing portfolio content and a public-facing website for visitors.",
    problem:
      "Developers often need a centralized place to present their technical work and professional background without relying entirely on third-party platforms.",
    solution:
      "Built a custom portfolio platform with a structured backend API, PostgreSQL database, authentication, and an administrative dashboard for managing content.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    thumbnail_public_id: "devfolio-thumbnail",
    github_url: "https://github.com/example/devfolio",
    live_url: "https://devfolio.example.com",
    featured: true,
    status: "maintained",
    start_date: "2026-01-10",
    end_date: null,
    created_at: "2026-01-10T08:00:00.000Z",
    updated_at: "2026-09-20T10:30:00.000Z",
  },

  {
    title: "TaskFlow",
    slug: "taskflow",
    short_description:
      "A collaborative task management application for organizing projects and team workflows.",
    description:
      "TaskFlow is a task management platform where users can create projects, organize tasks, assign responsibilities, and track progress through different workflow states.",
    problem:
      "Small teams need a simple way to coordinate work without the complexity of enterprise project management software.",
    solution:
      "Created a lightweight task management system with project-based organization, task assignments, status tracking, and RESTful APIs.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    thumbnail_public_id: "taskflow-thumbnail",
    github_url: "https://github.com/example/taskflow",
    live_url: "https://taskflow.example.com",
    featured: true,
    status: "completed",
    start_date: "2025-08-01",
    end_date: "2025-10-15",
    created_at: "2025-08-01T09:00:00.000Z",
    updated_at: "2025-10-15T14:20:00.000Z",
  },

  {
    title: "ShopSphere",
    slug: "shopsphere",
    short_description:
      "An e-commerce backend supporting products, inventory, orders, and payments.",
    description:
      "A backend-focused e-commerce system that handles product management, inventory validation, customer orders, and payment processing through an external payment provider.",
    problem:
      "E-commerce applications require multiple components to work together reliably while maintaining consistent inventory and order state.",
    solution:
      "Designed a modular backend with separate application services for orders, inventory, and payments while keeping infrastructure concerns isolated behind interfaces.",
    thumbnail_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    thumbnail_public_id: "shopsphere-thumbnail",
    github_url: "https://github.com/example/shopsphere",
    live_url: null,
    featured: true,
    status: "completed",
    start_date: "2025-04-12",
    end_date: "2025-07-30",
    created_at: "2025-04-12T07:30:00.000Z",
    updated_at: "2025-07-30T16:45:00.000Z",
  },

  {
    title: "BudgetWise",
    slug: "budgetwise",
    short_description:
      "A personal finance application for tracking expenses, income, and monthly budgets.",
    description:
      "BudgetWise allows users to record financial transactions, categorize expenses, define monthly budgets, and review spending patterns through a dashboard.",
    problem:
      "Manually tracking personal expenses makes it difficult to understand spending patterns and stay within a monthly budget.",
    solution:
      "Developed a centralized expense tracking application with categorized transactions and monthly budget calculations.",
    thumbnail_url: null,
    thumbnail_public_id: null,
    github_url: "https://github.com/example/budgetwise",
    live_url: "https://budgetwise.example.com",
    featured: false,
    status: "maintained",
    start_date: "2025-01-15",
    end_date: "2025-03-20",
    created_at: "2025-01-15T11:00:00.000Z",
    updated_at: "2026-06-05T09:15:00.000Z",
  },

  {
    title: "LinkVault",
    slug: "linkvault",
    short_description:
      "A URL shortening service with analytics and link management.",
    description:
      "LinkVault is a URL shortening service that generates short links and tracks basic usage statistics such as visit counts and creation dates.",
    problem:
      "Long URLs are difficult to share and manage, especially when links need to be tracked across different campaigns or applications.",
    solution:
      "Implemented a URL shortening API using unique identifiers, persistent storage, and redirect handling.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    thumbnail_public_id: "linkvault-thumbnail",
    github_url: "https://github.com/example/linkvault",
    live_url: "https://linkvault.example.com",
    featured: false,
    status: "completed",
    start_date: "2024-11-01",
    end_date: "2024-12-10",
    created_at: "2024-11-01T06:45:00.000Z",
    updated_at: "2024-12-10T12:00:00.000Z",
  },

  {
    title: "Realtime Chat",
    slug: "realtime-chat",
    short_description:
      "A real-time messaging application supporting private conversations and online presence.",
    description:
      "A real-time chat application where users can communicate through persistent conversations while receiving messages without manually refreshing the page.",
    problem:
      "Traditional request-response communication is inefficient for applications that require users to receive updates immediately.",
    solution:
      "Built a real-time communication layer using persistent connections and server-side event handling.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980",
    thumbnail_public_id: "realtime-chat-thumbnail",
    github_url: "https://github.com/example/realtime-chat",
    live_url: null,
    featured: false,
    status: "completed",
    start_date: "2024-08-05",
    end_date: "2024-10-01",
    created_at: "2024-08-05T10:00:00.000Z",
    updated_at: "2024-10-01T18:30:00.000Z",
  },

  {
    title: "API Monitor",
    slug: "api-monitor",
    short_description:
      "A service that monitors API endpoints and records uptime and response times.",
    description:
      "API Monitor periodically checks configured endpoints and records whether they are reachable along with their response times.",
    problem:
      "Developers need visibility into whether their APIs are available and how their response times change over time.",
    solution:
      "Created a monitoring service that performs scheduled HTTP checks and stores health-check results for later analysis.",
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    thumbnail_public_id: "api-monitor-thumbnail",
    github_url: "https://github.com/example/api-monitor",
    live_url: "https://monitor.example.com",
    featured: false,
    status: "in_progress",
    start_date: "2026-07-01",
    end_date: null,
    created_at: "2026-07-01T08:15:00.000Z",
    updated_at: "2026-09-18T13:45:00.000Z",
  },

  {
    title: "RecipeBox",
    slug: "recipebox",
    short_description:
      "A recipe management application for organizing and discovering recipes.",
    description:
      "RecipeBox allows users to create, edit, categorize, search, and save recipes. The application focuses on clean data modeling and efficient search functionality.",
    problem:
      "Recipes become difficult to organize when they are spread across bookmarks, notes, and different websites.",
    solution:
      "Built a centralized recipe management application with structured recipe data and category-based organization.",
    thumbnail_url: null,
    thumbnail_public_id: null,
    github_url: "https://github.com/example/recipebox",
    live_url: null,
    featured: false,
    status: "archived",
    start_date: "2024-02-10",
    end_date: "2024-04-05",
    created_at: "2024-02-10T09:30:00.000Z",
    updated_at: "2025-01-20T15:00:00.000Z",
  },

  {
    title: "Learning Tracker",
    slug: "learning-tracker",
    short_description:
      "A platform for tracking courses, study sessions, goals, and learning progress.",
    description:
      "Learning Tracker helps users organize their learning goals into courses and topics while recording study sessions and monitoring progress.",
    problem:
      "Learning multiple technical subjects simultaneously makes it difficult to track progress and maintain consistent study habits.",
    solution:
      "Designed a structured learning tracker where goals, subjects, sessions, and progress can be managed from one application.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
    thumbnail_public_id: "learning-tracker-thumbnail",
    github_url: "https://github.com/example/learning-tracker",
    live_url: "https://learning.example.com",
    featured: false,
    status: "in_progress",
    start_date: "2026-05-20",
    end_date: null,
    created_at: "2026-05-20T07:00:00.000Z",
    updated_at: "2026-09-10T11:30:00.000Z",
  },

  {
    title: "CloudDeploy",
    slug: "clouddeploy",
    short_description:
      "A deployment automation tool for building and deploying web applications.",
    description:
      "CloudDeploy is an experimental deployment platform that automates application builds and deployment workflows while providing basic deployment status information.",
    problem:
      "Manually repeating build and deployment steps can introduce errors and make application releases slower.",
    solution:
      "Designed an automated deployment workflow that coordinates source retrieval, application builds, and deployment steps.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    thumbnail_public_id: "clouddeploy-thumbnail",
    github_url: "https://github.com/example/clouddeploy",
    live_url: null,
    featured: false,
    status: "planned",
    start_date: "2026-10-01",
    end_date: null,
    created_at: "2026-09-01T08:00:00.000Z",
    updated_at: "2026-09-01T08:00:00.000Z",
  },
];
