import { ExperienceEntity } from "@dojo-portfolio/shared";

export const mockExperiences: Partial<ExperienceEntity>[] = [
  {
    company: "Acme Technologies",
    position: "Backend Developer",
    description:
      "Developed and maintained REST APIs using Node.js and Express, designed PostgreSQL database schemas, and implemented authentication and authorization systems.",
    start_date: "2025-06-01",
    end_date: null,
    current: true,
    created_at: "2025-06-01T08:00:00.000Z",
    updated_at: "2026-09-01T08:00:00.000Z",
  },
  {
    company: "Pixel Labs",
    position: "Full Stack Developer",
    description:
      "Built responsive web applications using React and TypeScript while developing backend services with Node.js and PostgreSQL.",
    start_date: "2024-01-15",
    end_date: "2025-05-15",
    current: false,
    created_at: "2024-01-15T08:00:00.000Z",
    updated_at: "2025-05-15T08:00:00.000Z",
  },
  {
    company: "WebCraft Solutions",
    position: "Junior Software Developer",
    description:
      "Assisted in developing and maintaining internal web applications, fixed bugs, wrote reusable frontend components, and integrated third-party APIs.",
    start_date: "2023-06-01",
    end_date: "2023-12-20",
    current: false,
    created_at: "2023-06-01T08:00:00.000Z",
    updated_at: "2023-12-20T08:00:00.000Z",
  },
  {
    company: "DevHub Inc.",
    position: "Software Engineering Intern",
    description:
      "Worked with senior developers to implement application features, write tests, debug issues, and learn software development practices in a collaborative environment.",
    start_date: "2022-06-01",
    end_date: "2022-09-30",
    current: false,
    created_at: "2022-06-01T08:00:00.000Z",
    updated_at: "2022-09-30T08:00:00.000Z",
  },
];
