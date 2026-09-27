import { ContactMessage } from "@dojo-portfolio/shared";

export const mockContactMessages: Partial<ContactMessage>[] = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    subject: "Project Inquiry",
    message:
      "Hi, I came across your portfolio and I'm interested in discussing a potential web development project. Would you be available for a quick conversation sometime next week?",
    created_at: "2026-09-20T09:30:00.000Z",
    updated_at: null,
    read_at: null,
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    subject: "Freelance Opportunity",
    message:
      "Hello! We're looking for a backend developer to help us build a REST API for our upcoming product. I'd love to hear about your availability and experience with Node.js and PostgreSQL.",
    created_at: "2026-09-19T14:15:00.000Z",
    updated_at: "2026-09-19T15:00:00.000Z",
    read_at: null,
  },
  {
    name: "Michael Chen",
    email: "michael.chen@example.com",
    subject: "Great Portfolio!",
    message:
      "I really enjoyed looking through your projects. The architecture and backend work stood out to me. Keep up the great work!",
    created_at: "2026-09-18T06:45:00.000Z",
    updated_at: null,
    read_at: null,
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    subject: "Website Development",
    message:
      "I'm interested in having a personal website built and wanted to know if you are currently accepting new projects. If so, could you send me some information about your process?",
    created_at: "2026-09-17T11:20:00.000Z",
    updated_at: null,
    read_at: null,
  },
  {
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    subject: "Question About Your Tech Stack",
    message:
      "What technologies did you use to build your portfolio? I'm particularly interested in how you structured the backend and handled authentication.",
    created_at: "2026-09-15T16:10:00.000Z",
    updated_at: null,
    read_at: null,
  },
];
