import { CreateSkillBody, SkillQuerySchema } from "@dojo-portfolio/shared";
import { Controller } from "../../types/handler.types";

import * as skillService from "./skill.service";

export const getSkills: Controller = async (req, res, next) => {
  try {
    const skills = await skillService.getSkills(
      SkillQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data: { skills } });
  } catch (error) {
    next(error);
  }
};
export const getSkillById: Controller = async (req, res, next) => {
  try {
    const skill = await skillService.getSkillById(req.params.skillId as string);

    res.status(200).json({ success: true, data: { skill } });
  } catch (error) {
    next(error);
  }
};
export const createSkill: Controller = async (req, res, next) => {
  try {
    const skill = await skillService.createSkill(req.body as CreateSkillBody);

    res.status(201).json({ success: true, data: { skill } });
  } catch (error) {
    next(error);
  }
};
export const deleteSkill: Controller = async (req, res, next) => {
  try {
    const skill = await skillService.deleteSkill(req.params.skillId as string);

    res.status(200).json({ success: true, data: { skill } });
  } catch (error) {
    next(error);
  }
};
