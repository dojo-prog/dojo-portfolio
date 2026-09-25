import {
  CreateExperienceBody,
  ExperienceEntity,
  ExperienceQuery,
} from "@dojo-portfolio/shared";
import {
  GetExperienceResult,
  UpdateExperienceParams,
} from "./experience.types";
import { calculateTotalPages } from "../../utils/calculateTotalPages";
import { AppError } from "../../utils/errors/AppError";

import * as experienceRepository from "./experience.repository";

export const getExperiences = async (
  query: ExperienceQuery,
): Promise<GetExperienceResult> => {
  const { experiences, total } = await experienceRepository.find(query);

  const { page, limit } = query;

  return {
    experiences,
    pagination: {
      page,
      limit,
      total,
      total_pages: calculateTotalPages(total, limit),
    },
  };
};

export const getExperienceById = async (
  experienceId: string,
): Promise<ExperienceEntity> => {
  return experienceRepository.findById(experienceId);
};

export const createExperience = async (
  payload: CreateExperienceBody,
): Promise<ExperienceEntity> => {
  return experienceRepository.add(payload);
};

export const updateExperience = async (
  params: UpdateExperienceParams,
): Promise<ExperienceEntity> => {
  const { experienceId, payload } = params;

  const experience = await experienceRepository.findById(experienceId);

  if (!experience) {
    throw new AppError(404, "Experience not found");
  }

  return experienceRepository.update(experience, payload);
};

export const deleteExperience = async (
  experienceId: string,
): Promise<ExperienceEntity> => {
  const deletedExperience = await experienceRepository.remove(experienceId);

  if (!deleteExperience) {
    throw new AppError(404, "Experience not found");
  }

  return deletedExperience;
};
