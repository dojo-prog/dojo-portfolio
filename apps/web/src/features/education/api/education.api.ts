import type { EducationQuery } from "@dojo-portfolio/shared";
import type {
  FetchAllEducationsRes,
  FetchEducationRes,
  FetchEducationsRes,
} from "../types/education.types";
import { api } from "@/lib/axios/client";

export const fetchEducations = async (params: EducationQuery) => {
  const { data } = await api.get<FetchEducationsRes>("/v1/experiences", {
    params,
  });

  return data;
};

export const fetchAllEducations = async () => {
  const { data } = await api.get<FetchAllEducationsRes>("/v1/experiences/all");

  return data;
};

export const fetchEducation = async (experienceId: string) => {
  const { data } = await api.get<FetchEducationRes>(
    `/v1/experiences/${experienceId}`,
  );

  return data;
};
