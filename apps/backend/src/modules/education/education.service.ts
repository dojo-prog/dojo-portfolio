import {
  CreateEducationBody,
  EducationEntity,
  EducationQuery,
} from "@dojo-portfolio/shared";
import { GetEducationResult, UpdateEducationParams } from "./education.types";
import { calculateTotalPages } from "../../utils/calculateTotalPages";
import { AppError } from "../../utils/errors/AppError";

import * as educationRepository from "./education.repository";

export const getEducations = async (
  query: EducationQuery,
): Promise<GetEducationResult> => {
  const { educations, total } = await educationRepository.find(query);

  const { page, limit } = query;

  return {
    educations,
    pagination: {
      page,
      limit,
      total,
      total_pages: calculateTotalPages(total, limit),
    },
  };
};

export const getAllEducations = async (): Promise<EducationEntity[]> => {
  return educationRepository.findAll();
};

export const getEducationById = async (
  educationId: string,
): Promise<EducationEntity> => {
  const education = await educationRepository.findById(educationId);

  if (!education) {
    throw new AppError(404, "Education not found");
  }

  return education;
};

export const createEducation = async (
  payload: CreateEducationBody,
): Promise<EducationEntity> => {
  return educationRepository.add(payload);
};

export const updateEducation = async (
  params: UpdateEducationParams,
): Promise<EducationEntity> => {
  const { educationId, payload } = params;

  const education = await educationRepository.findById(educationId);

  if (!education) {
    throw new AppError(404, "Education not found");
  }

  return educationRepository.update(education, payload);
};

export const deleteEducation = async (
  educationId: string,
): Promise<EducationEntity> => {
  const deletedEducation = await educationRepository.remove(educationId);

  if (!deletedEducation) {
    throw new AppError(404, "Education not found");
  }

  return deletedEducation;
};
