import { z } from "zod";
import { UUIDSchema } from "../common";
import { SkillCategorySchema, SkillNameSchema } from "../skills";

// =======================================
// ENTITY
// =======================================

export const ProjectSkillEntitySchema = z.object({
  project_id: UUIDSchema,
  skill_id: UUIDSchema,
});

export const ProjectSkillWithRelationsSchema = ProjectSkillEntitySchema.omit({
  skill_id: true,
}).extend({
  skill: z.object({
    id: UUIDSchema,
    name: SkillNameSchema,
    category: SkillCategorySchema,
  }),
});

// =======================================
// TYPES
// =======================================

export type ProjectSkill = z.infer<typeof ProjectSkillEntitySchema>;

export type ProjectSkillWithRelations = z.infer<
  typeof ProjectSkillWithRelationsSchema
>;
