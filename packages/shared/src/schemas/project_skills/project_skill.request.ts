import { z } from "zod";
import { UUIDSchema } from "../common";

// =======================================
// PARAMS
// =======================================

export const ProjectSkillParamsSchema = z.object({
  projectId: UUIDSchema,
  skillId: UUIDSchema,
});

// =======================================
// BODY
// =======================================

export const AddProjectSkillBodySchema = z.object({
  projectId: UUIDSchema,
  skillId: UUIDSchema,
});

export const AddProjectSkillsBodySchema = z.object({
  projectId: UUIDSchema,
  skillIds: z.array(UUIDSchema),
});

// =======================================
// TYPES
// =======================================

export type AddProjectSkillBody = z.infer<typeof AddProjectSkillBodySchema>;
export type AddProjectSkillsBody = z.infer<typeof AddProjectSkillsBodySchema>;

export type AddProjectSkillInput = z.input<typeof AddProjectSkillBodySchema>;
export type AddProjectSkillsInput = z.input<typeof AddProjectSkillsBodySchema>;
