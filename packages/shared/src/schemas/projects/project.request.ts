import { z } from "zod";
import {
  GithubUrlSchema,
  IsoDateSchema,
  OptionalGithubUrlSchema,
  OptionalIsoDateSchema,
  OptionalUrlSchema,
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
  githubUrl: OptionalGithubUrlSchema,
  liveUrl: OptionalUrlSchema,
  featured: z.coerce.boolean().default(false),
  status: ProjectStatusSchema,
  startDate: OptionalIsoDateSchema,
  endDate: OptionalIsoDateSchema,
});

export const CreateProjectBodySchema = BaseProjectBodySchema;

export const UpdateProjectBodySchema = BaseProjectBodySchema;

export const UpdateProjectSkillsBodySchema = z.object({
  skillIds: z.array(UUIDSchema),
});

// =======================================
// TYPES
// =======================================

export type ProjectAllowableSort = z.infer<typeof ProjectAllowableSortSchema>;

export type ProjectQuery = z.infer<typeof ProjectQuerySchema>;

export type CreateProjectBody = z.infer<typeof CreateProjectBodySchema>;
export type UpdateProjectBody = z.infer<typeof UpdateProjectBodySchema>;
export type UpdateProjectSkillsBody = z.infer<
  typeof UpdateProjectSkillsBodySchema
>;

export type CreateProjectInput = z.input<typeof CreateProjectBodySchema>;
export type UpdateProjectInput = z.input<typeof UpdateProjectBodySchema>;
export type UpdateProjectSkillsInput = z.input<
  typeof UpdateProjectSkillsBodySchema
>;
