import ProjectCard from "@/features/projects/components/ProjectCard";
import type {
  ProjectQuery,
  ProjectWithRelations,
} from "@dojo-portfolio/shared";
import ProjectFilters from "./ProjectFilters";
import type { Dispatch, SetStateAction } from "react";

export const dummyProjects: ProjectWithRelations[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Portfolio Management System",
    slug: "portfolio-management-system",
    short_description:
      "A full-stack platform for managing projects, skills, experience, and contact messages.",
    description:
      "A portfolio management system built with React, Node.js, PostgreSQL, and TypeScript.",
    problem:
      "Managing portfolio content manually across multiple pages was time-consuming and error-prone.",
    solution:
      "Built an admin dashboard that allows portfolio content to be managed through a centralized interface.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    thumbnail_public_id: "portfolio-management-system",
    github_url: "https://github.com/example/portfolio-management-system",
    live_url: "https://example.com",
    featured: true,
    status: "completed",
    start_date: "2026-01-10",
    end_date: "2026-03-15",
    created_at: "2026-01-10T08:00:00.000Z",
    updated_at: "2026-03-15T08:00:00.000Z",

    project_skills: [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        name: "React",
        category: "frontend",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        name: "Node.js",
        category: "backend",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        name: "PostgreSQL",
        category: "database",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        name: "TypeScript",
        category: "language",
      },
    ],
  },

  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    title: "E-Commerce API",
    slug: "e-commerce-api",
    short_description:
      "A REST API for products, users, carts, orders, and payment processing.",
    description:
      "A backend-focused e-commerce API designed with modular architecture and PostgreSQL.",
    problem:
      "Small e-commerce applications often become difficult to maintain as business logic grows.",
    solution:
      "Designed the API with clear separation between presentation, application, domain, and infrastructure concerns.",
    thumbnail_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    thumbnail_public_id: "e-commerce-api",
    github_url: "https://github.com/example/e-commerce-api",
    live_url: null,
    featured: true,
    status: "completed",
    start_date: "2025-08-01",
    end_date: "2025-10-20",
    created_at: "2025-08-01T08:00:00.000Z",
    updated_at: "2025-10-20T08:00:00.000Z",

    project_skills: [
      {
        id: "550e8400-e29b-41d4-a716-446655440006",
        name: "Express",
        category: "backend",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440007",
        name: "PostgreSQL",
        category: "database",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440008",
        name: "Redis",
        category: "database",
      },
    ],
  },

  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    title: "Task Management App",
    slug: "task-management-app",
    short_description:
      "A collaborative task management application with projects, tasks, and user assignments.",
    description:
      "A web application for organizing projects and managing tasks across teams.",
    problem:
      "Teams needed a simple way to organize work and track task progress.",
    solution:
      "Created a centralized task management interface with project-based organization.",
    thumbnail_url: null,
    thumbnail_public_id: null,
    github_url: "https://github.com/example/task-management",
    live_url: "https://tasks.example.com",
    featured: false,
    status: "in_progress",
    start_date: "2026-04-01",
    end_date: null,
    created_at: "2026-04-01T08:00:00.000Z",
    updated_at: "2026-06-10T08:00:00.000Z",

    project_skills: [
      {
        id: "550e8400-e29b-41d4-a716-446655440010",
        name: "React",
        category: "frontend",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440011",
        name: "TypeScript",
        category: "language",
      },
    ],
  },
];

type Props = {
  projects: ProjectWithRelations[];
  filters: ProjectQuery;
  setFilters: Dispatch<SetStateAction<ProjectQuery>>;
};

const ProjectList = ({ projects, filters, setFilters }: Props) => {
  return (
    <main className="space-y-6">
      {/* Filters */}
      <ProjectFilters filters={filters} setFilters={setFilters} />

      {/* Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </main>
  );
};

export default ProjectList;
