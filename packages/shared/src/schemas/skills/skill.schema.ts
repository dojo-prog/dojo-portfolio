import { z } from "zod";
import { IsoDatetimeSchema, UUIDSchema } from "../common";

// =======================================
// REUSABLE FIELDS
// =======================================

export const SkillNameSchema = z
  .string()
  .min(1, { message: "Skill name is required" })
  .max(50, "Skill name cannot exceed 50 characters");

// =======================================
// ENUM
// =======================================

export const SkillCategorySchema = z.enum([
  "language",
  "frontend",
  "backend",
  "mobile",
  "desktop",
  "database",
  "cloud",
  "devops",
  "testing",
  "security",
  "data",
  "ai",
  "tools",
  "other",
]);

// =======================================
// ENTITY
// =======================================

export const SkillEntitySchema = z.object({
  id: UUIDSchema,
  name: SkillNameSchema,
  category: SkillCategorySchema,
  created_at: IsoDatetimeSchema,
});

// =======================================
// TYPES
// =======================================

export type SkillCategory = z.infer<typeof SkillCategorySchema>;

export type SkillEntity = z.infer<typeof SkillEntitySchema>;
