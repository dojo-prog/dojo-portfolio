import type { EducationQuery } from "@dojo-portfolio/shared";
import type {
  FetchAllEducationsRes,
  FetchEducationRes,
  FetchEducationsRes,
} from "../types/education.types";
import { api } from "@/lib/axios/client";

export const fetchEducations = async (params: EducationQuery) => {
  const { data } = await api.get<FetchEducationsRes>("/v1/education", {
    params,
  });

  return data;
};

export const fetchAllEducations = async () => {
  const { data } = await api.get<FetchAllEducationsRes>("/v1/education/all");

  return data;
};

export const fetchEducation = async (educationId: string) => {
  const { data } = await api.get<FetchEducationRes>(
    `/v1/education/${educationId}`,
  );

  return data;
};
