import { z } from "zod";
import { SkillCategorySchema, SkillNameSchema } from "./skill.schema";
import { SearchQuerySchema, UUIDSchema } from "../common";

// =======================================
// ENUM
// =======================================

export const SkillAllowableSortSchema = z.enum(["newest", "oldest"], {
  message: "Invalid skill sorting",
});

// =======================================
// PARAMS
// =======================================

export const SkillIdParamsSchema = z.object({
  skillId: UUIDSchema,
});

// =======================================
// QUERY
// =======================================

export const SkillQuerySchema = z.object({
  search: SearchQuerySchema,
  category: SkillCategorySchema.optional(),
  sort: SkillAllowableSortSchema.optional(),
});

// =======================================
// BODY
// =======================================

export const CreateSkillBodySchema = z.object({
  name: SkillNameSchema,
  category: SkillCategorySchema,
});

// =======================================
// TYPES
// =======================================

export type SkillAllowableSort = z.infer<typeof SkillAllowableSortSchema>;

export type SkillQuery = z.infer<typeof SkillQuerySchema>;

export type CreateSkillBody = z.infer<typeof CreateSkillBodySchema>;

export type CreateSkillInput = z.input<typeof CreateSkillBodySchema>;
