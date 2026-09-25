import {
  CreateExperienceBody,
  ExperienceQuerySchema,
  UpdateExperienceBody,
} from "@dojo-portfolio/shared";
import { Controller } from "../../types/handler.types";

import * as experienceService from "./experience.service";

export const getExperiences: Controller = async (req, res, next) => {
  try {
    const data = await experienceService.getExperiences(
      ExperienceQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getExperienceById: Controller = async (req, res, next) => {
  try {
    const experience = await experienceService.getExperienceById(
      req.params.experienceId as string,
    );

    res.status(200).json({ success: true, data: { experience } });
  } catch (error) {
    next(error);
  }
};

export const createExperience: Controller = async (req, res, next) => {
  try {
    const experience = await experienceService.createExperience(
      req.body as CreateExperienceBody,
    );

    res.status(201).json({ success: true, data: { experience } });
  } catch (error) {
    next(error);
  }
};

export const updateExperience: Controller = async (req, res, next) => {
  try {
    const experience = await experienceService.updateExperience({
      experienceId: req.params.experienceId as string,
      payload: req.body as UpdateExperienceBody,
    });

    res.status(200).json({ success: true, data: { experience } });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience: Controller = async (req, res, next) => {
  try {
    const experience = await experienceService.deleteExperience(
      req.params.experienceId as string,
    );

    res.status(200).json({ success: true, data: { experience } });
  } catch (error) {
    next(error);
  }
};
