import { api } from "@/lib/axios/axios";
import type {
  CreateExperienceRes,
  DeleteExperienceRes,
  FetchExperienceRes,
  FetchExperiencesRes,
  UpdateExperienceRes,
} from "../types/experience.types";

import type {
  CreateExperienceBody,
  ExperienceQuery,
  UpdateExperienceBody,
} from "@dojo-portfolio/shared";

export const fetchExperiences = async (params: ExperienceQuery) => {
  const { data } = await api.get<FetchExperiencesRes>("/v1/experience", {
    params,
  });

  return data;
};

export const fetchExperience = async (experienceId: string) => {
  const { data } = await api.get<FetchExperienceRes>(
    `/v1/experience/${experienceId}`,
  );

  return data;
};

export const createExperience = async (body: CreateExperienceBody) => {
  const { data } = await api.post<CreateExperienceRes>(`/v1/experience`, body);

  return data;
};

export const updateExperience = async (
  experienceId: string,
  body: UpdateExperienceBody,
) => {
  const { data } = await api.patch<UpdateExperienceRes>(
    `/v1/experience/${experienceId}`,
    body,
  );

  return data;
};

export const deleteExperience = async (experienceId: string) => {
  const { data } = await api.delete<DeleteExperienceRes>(
    `/v1/experience/${experienceId}`,
  );

  return data;
};
