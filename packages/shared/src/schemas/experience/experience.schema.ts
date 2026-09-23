import { z } from "zod";
import { IsoDateSchema, IsoDatetimeSchema, UUIDSchema } from "../common";

// =======================================
// REUSABLE FIELDS
// =======================================

export const CompanyNameSchema = z
  .string()
  .min(1, { message: "Company name is required" })
  .max(100, { message: "Company name cannot exceed 100 characters" });

export const PositionSchema = z
  .string()
  .min(1, { message: "Position is required" })
  .max(100, { message: "Position cannot exceed 100 characters" });

export const ExperienceDescriptionSchema = z
  .string()
  .min(1, { message: "Experience description is required" })
  .max(2000, {
    message: "Experience description cannot exceed 2000 characters",
  });

// =======================================
// ENTITY
// =======================================

export const ExperienceEntitySchema = z.object({
  id: UUIDSchema,
  company: CompanyNameSchema,
  position: PositionSchema,
  description: ExperienceDescriptionSchema,
  start_date: IsoDateSchema,
  end_date: IsoDateSchema.nullable(),
  current: z.boolean(),
  created_at: IsoDatetimeSchema,
  updated_at: IsoDatetimeSchema,
});

// =======================================
// TYPES
// =======================================

export type ExperienceEntity = z.infer<typeof ExperienceEntitySchema>;
