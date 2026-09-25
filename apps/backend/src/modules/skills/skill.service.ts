import {
  CreateSkillBody,
  SkillEntity,
  SkillQuery,
} from "@dojo-portfolio/shared";
import { AppError } from "../../utils/errors/AppError";

import * as skillRepository from "./skill.repository";

export const getSkills = async (query: SkillQuery): Promise<SkillEntity[]> => {
  return skillRepository.find(query);
};

export const getSkillById = async (skillId: string): Promise<SkillEntity> => {
  const skill = await skillRepository.findById(skillId);

  if (!skill) {
    throw new AppError(404, "Skill not found");
  }

  return skill;
};

export const createSkill = async (
  payload: CreateSkillBody,
): Promise<SkillEntity> => {
  return skillRepository.add(payload);
};

export const deleteSkill = async (skillId: string): Promise<SkillEntity> => {
  const deletedSkill = await skillRepository.remove(skillId);

  if (!deletedSkill) {
    throw new AppError(404, "Skill not found");
  }

  return deletedSkill;
};
