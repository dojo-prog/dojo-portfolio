import {
  CreateEducationBody,
  EducationQuerySchema,
  UpdateEducationBody,
} from "@dojo-portfolio/shared";
import { Controller } from "../../types/handler.types";

import * as educationService from "./education.service";

export const getEducations: Controller = async (req, res, next) => {
  try {
    const data = await educationService.getEducations(
      EducationQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getAllEducations: Controller = async (req, res, next) => {
  try {
    const educations = await educationService.getAllEducations();

    res.status(200).json({ success: true, data: { educations } });
  } catch (error) {
    next(error);
  }
};

export const getEducationById: Controller = async (req, res, next) => {
  try {
    const education = await educationService.getEducationById(
      req.params.educationId as string,
    );

    res.status(200).json({ success: true, data: { education } });
  } catch (error) {
    next(error);
  }
};

export const createEducation: Controller = async (req, res, next) => {
  try {
    const education = await educationService.createEducation(
      req.body as CreateEducationBody,
    );

    res.status(201).json({ success: true, data: { education } });
  } catch (error) {
    next(error);
  }
};

export const updateEducation: Controller = async (req, res, next) => {
  try {
    const education = await educationService.updateEducation({
      educationId: req.params.educationId as string,
      payload: req.body as UpdateEducationBody,
    });

    res.status(200).json({ success: true, data: { education } });
  } catch (error) {
    next(error);
  }
};

export const deleteEducation: Controller = async (req, res, next) => {
  try {
    const education = await educationService.deleteEducation(
      req.params.educationId as string,
    );

    res.status(200).json({ success: true, data: { education } });
  } catch (error) {
    next(error);
  }
};
