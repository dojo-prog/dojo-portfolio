import { z } from "zod";
import {
  GithubUrlSchema,
  IsoDateSchema,
  PaginationQuerySchema,
  RequiredDescriptionSchema,
  RequiredShortDescriptionSchema,
  SearchQuerySchema,
  UrlSchema,
  UUIDSchema,
} from "../common";
import {
  ProjectProblemSolvedSchema,
  ProjectSolutionExplanationSchema,
  ProjectStatusSchema,
  ProjectTitleSchema,
} from "./project.schema";

// =======================================
// ENUM
// =======================================

export const ProjectAllowableSortSchema = z.enum(["newest", "oldest"]);

// =======================================
// PARAMS
// =======================================

export const ProjectIdParamsSchema = z.object({
  projectId: UUIDSchema,
});

// =======================================
// QUERY
// =======================================

export const ProjectQuerySchema = z.object({
  ...PaginationQuerySchema.shape,

  search: SearchQuerySchema,
  sort: ProjectAllowableSortSchema.optional(),
  featured: z.coerce.boolean().optional(),
  status: ProjectStatusSchema.optional(),
});

// =======================================
// BODY
// =======================================

export const BaseProjectBodySchema = z.object({
  title: ProjectTitleSchema,
  shortDescription: RequiredShortDescriptionSchema,
  description: RequiredDescriptionSchema,
  problem: ProjectProblemSolvedSchema.optional(),
  solution: ProjectSolutionExplanationSchema.optional(),
  githubUrl: GithubUrlSchema.optional(),
  liveUrl: UrlSchema.optional(),
  featured: z.coerce.boolean().default(false),
  status: ProjectStatusSchema,
  startDate: IsoDateSchema.optional(),
  endDate: IsoDateSchema.optional(),
});

export const CreateProjectBodySchema = BaseProjectBodySchema;

export const UpdateProjectBodySchema = BaseProjectBodySchema;

// =======================================
// TYPES
// =======================================

export type ProjectAllowableSort = z.infer<typeof ProjectAllowableSortSchema>;

export type ProjectQuery = z.infer<typeof ProjectQuerySchema>;

export type CreateProjectBody = z.infer<typeof CreateProjectBodySchema>;
export type UpdateProjectBody = z.infer<typeof UpdateProjectBodySchema>;

export type CreateProjectInput = z.input<typeof CreateProjectBodySchema>;
export type UpdateProjectInput = z.input<typeof UpdateProjectBodySchema>;
