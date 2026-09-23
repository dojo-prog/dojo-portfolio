import { z } from "zod";
import { IsoDateSchema, UUIDSchema } from "../common";

// =======================================
// REUSABLE FIELDS
// =======================================

export const EducationInstitutionSchema = z
  .string()
  .min(1, { message: "Institution is required" })
  .max(200, { message: "Institution cannot exceed 200 characters" });

export const EducationDegreeSchema = z
  .string()
  .min(1, { message: "Education degree is required" })
  .max(200, { message: "Education degree cannot exceed 200 characters" });

export const EducationFieldSchema = z
  .string()
  .max(200, { message: "Education field cannot exceed 200 characters" })
  .nullable();

export const EducationDescriptionSchema = z
  .string()
  .max(2000, { message: "Education description cannot exceed 2000 characters" })
  .nullable();

// =======================================
// ENTITY
// =======================================

export const EducationEntitySchema = z.object({
  id: UUIDSchema,
  institution: EducationInstitutionSchema,
  degree: EducationDegreeSchema,
  field: EducationFieldSchema,
  description: EducationDescriptionSchema,
  start_date: IsoDateSchema.nullable(),
  end_date: IsoDateSchema.nullable(),
});

// =======================================
// TYPES
// =======================================

export type EducationEntity = z.infer<typeof EducationEntitySchema>;
