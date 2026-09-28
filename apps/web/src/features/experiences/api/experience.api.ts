import { api } from "@/lib/axios/client";
import type { ExperienceQuery } from "@dojo-portfolio/shared";
import type {
  FetchAllExperiencesRes,
  FetchExperienceRes,
  FetchExperiencesRes,
} from "../types/experience.types";

export const fetchExperiences = async (params: ExperienceQuery) => {
  const { data } = await api.get<FetchExperiencesRes>("/v1/experiences", {
    params,
  });

  return data;
};

export const fetchAllExperiences = async () => {
  const { data } = await api.get<FetchAllExperiencesRes>("/v1/experiences/all");

  return data;
};

export const fetchExperience = async (experienceId: string) => {
  const { data } = await api.get<FetchExperienceRes>(
    `/v1/experiences/${experienceId}`,
  );

  return data;
};
