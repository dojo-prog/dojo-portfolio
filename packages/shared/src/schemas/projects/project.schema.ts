import { z } from "zod";
import {
  GithubUrlSchema,
  ImagePublicId,
  IsoDateSchema,
  IsoDatetimeSchema,
  RequiredDescriptionSchema,
  RequiredShortDescriptionSchema,
  SlugSchema,
  UrlSchema,
  UUIDSchema,
} from "../common";

// =======================================
// REUSABLE FIELDS
// =======================================

export const ProjectTitleSchema = z
  .string()
  .min(1, { message: "Project title is required" })
  .max(100, { message: "Project title cannot exceed 100 characters" });

export const ProjectProblemSolvedSchema = z
  .string()
  .max(500, { message: "Problem solved entry cannot exceed 500 characters" })
  .optional();

export const ProjectSolutionExplanationSchema = z
  .string()
  .max(1000, { message: "Problem solved entry cannot exceed 1000 characters" })
  .optional();

// =======================================
// ENUM
// =======================================

export const ProjectStatusSchema = z.enum(
  ["in_progress", "completed", "maintained", "archived", "planned"],
  { message: "Invalid project status" },
);

// =======================================
// ENTITY
// =======================================

export const ProjectEntitySchema = z.object({
  id: UUIDSchema,
  title: ProjectTitleSchema,
  slug: SlugSchema,
  short_description: RequiredShortDescriptionSchema,
  description: RequiredDescriptionSchema,
  problem: ProjectProblemSolvedSchema.nullable(),
  solution: ProjectSolutionExplanationSchema.nullable(),
  thumbnail_url: UrlSchema.nullable(),
  thumbnail_public_id: ImagePublicId.nullable(),
  github_url: GithubUrlSchema.nullable(),
  live_url: UrlSchema.nullable(),
  featured: z.coerce.boolean(),
  status: ProjectStatusSchema,
  start_date: IsoDateSchema.nullable(),
  end_date: IsoDateSchema.nullable(),
  created_at: IsoDatetimeSchema,
  updated_at: IsoDatetimeSchema,
});

// =======================================
// TYPES
// =======================================

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export type Project = z.infer<typeof ProjectEntitySchema>;
