import { z } from "zod";
import {
  IsoDateSchema,
  OptionalIsoDateSchema,
  PaginationQuerySchema,
  SearchQuerySchema,
  UUIDSchema,
} from "../common";
import {
  EducationDegreeSchema,
  EducationDescriptionSchema,
  EducationFieldSchema,
  EducationInstitutionSchema,
} from "./education.schema";

// =======================================
// ENUM
// =======================================

export const EducationAllowableSortSchema = z.enum(["newest", "oldest"]);

// =======================================
// PARAMS
// =======================================

export const EducationIdParamsSchema = z.object({
  educationId: UUIDSchema,
});

// =======================================
// QUERY
// =======================================

export const EducationQuerySchema = z.object({
  ...PaginationQuerySchema.shape,

  search: SearchQuerySchema,
  sort: EducationAllowableSortSchema.optional(),
});

// =======================================
// BODY
// =======================================

export const BaseEducationBodySchema = z.object({
  institution: EducationInstitutionSchema,
  degree: EducationDegreeSchema,
  field: EducationFieldSchema,
  description: EducationDescriptionSchema,
  startDate: OptionalIsoDateSchema,
  endDate: OptionalIsoDateSchema,
});

export const CreateEducationBodySchema = BaseEducationBodySchema;

export const UpdateEducationBodySchema = BaseEducationBodySchema;

// =======================================
// TYPES
// =======================================

export type EducationAllowableSort = z.infer<
  typeof EducationAllowableSortSchema
>;

export type EducationQuery = z.infer<typeof EducationQuerySchema>;

export type CreateEducationBody = z.infer<typeof CreateEducationBodySchema>;
export type UpdateEducationBody = z.infer<typeof UpdateEducationBodySchema>;

export type CreateEducationInput = z.input<typeof CreateEducationBodySchema>;
export type UpdateEducationInput = z.input<typeof UpdateEducationBodySchema>;
