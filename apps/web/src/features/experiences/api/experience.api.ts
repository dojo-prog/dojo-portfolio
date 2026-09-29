import { api } from "@/lib/axios/client";
import type { ExperienceQuery } from "@dojo-portfolio/shared";
import type {
  FetchAllExperiencesRes,
  FetchExperienceRes,
  FetchExperiencesRes,
} from "../types/experience.types";

export const fetchExperiences = async (params: ExperienceQuery) => {
  const { data } = await api.get<FetchExperiencesRes>("/v1/experience", {
    params,
  });

  return data;
};

export const fetchAllExperiences = async () => {
  const { data } = await api.get<FetchAllExperiencesRes>("/v1/experience/all");

  return data;
};

export const fetchExperience = async (experienceId: string) => {
  const { data } = await api.get<FetchExperienceRes>(
    `/v1/experience/${experienceId}`,
  );

  return data;
};
