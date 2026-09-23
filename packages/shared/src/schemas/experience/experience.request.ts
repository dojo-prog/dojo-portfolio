import { z } from "zod";
import {
  IsoDateSchema,
  PaginationQuerySchema,
  SearchQuerySchema,
  UUIDSchema,
} from "../common";
import {
  CompanyNameSchema,
  ExperienceDescriptionSchema,
  PositionSchema,
} from "./experience.schema";

// =======================================
// ENUM
// =======================================

export const ExperienceAllowableSortSchema = z.enum(["newest", "oldest"]);

// =======================================
// PARAMS
// =======================================

export const ExperienceIdParamsSchema = z.object({
  experienceId: UUIDSchema,
});

// =======================================
// QUERY
// =======================================

export const ExperienceQuerySchema = z.object({
  ...PaginationQuerySchema.shape,

  search: SearchQuerySchema,
  sort: ExperienceAllowableSortSchema.optional(),
  current: z.coerce.boolean().optional(),
});

// =======================================
// BODY
// =======================================

export const BaseExperienceBodySchema = z.object({
  company: CompanyNameSchema,
  position: PositionSchema,
  description: ExperienceDescriptionSchema,
  startDate: IsoDateSchema,
  endDate: IsoDateSchema.optional(),
  current: z.boolean(),
});

export const CreateExperienceBodySchema = BaseExperienceBodySchema;

export const UpdateExperienceBodySchema = BaseExperienceBodySchema;

// =======================================
// TYPES
// =======================================

export type ExperienceAllowableSort = z.infer<
  typeof ExperienceAllowableSortSchema
>;

export type ExperienceQuery = z.infer<typeof ExperienceQuerySchema>;

export type CreateExperienceBody = z.infer<typeof CreateExperienceBodySchema>;
export type UpdateExperienceBody = z.infer<typeof UpdateExperienceBodySchema>;

export type CreateExperienceInput = z.input<typeof CreateExperienceBodySchema>;
export type UpdateExperienceInput = z.input<typeof UpdateExperienceBodySchema>;
