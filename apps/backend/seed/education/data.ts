import { EducationEntity } from "@dojo-portfolio/shared";

export const mockEducations: Partial<EducationEntity>[] = [
  {
    institution: "University of the Philippines",
    degree: "Bachelor of Science",
    field: "Information Technology",
    description:
      "Studied software development, database systems, computer networks, operating systems, and information systems. Built web applications and software projects as part of coursework.",
    start_date: "2022-08-01",
    end_date: "2026-05-30",
  },
  {
    institution: "Google",
    degree: "Professional Certificate",
    field: "Google IT Automation with Python",
    description:
      "Completed coursework covering Python programming, automation, version control, troubleshooting, and practical IT automation techniques.",
    start_date: "2025-01-10",
    end_date: "2025-06-15",
  },
  {
    institution: "freeCodeCamp",
    degree: "Certification",
    field: "Full Stack Web Development",
    description:
      "Completed practical coursework focused on responsive web design, JavaScript, frontend development, backend development, APIs, and databases.",
    start_date: "2024-02-01",
    end_date: "2024-11-20",
  },
  {
    institution: "Coursera",
    degree: "Professional Certificate",
    field: "Backend Development",
    description:
      "Completed online coursework covering backend application development, REST APIs, databases, authentication, and deployment fundamentals.",
    start_date: "2025-08-01",
    end_date: null,
  },
];
