import { api } from "@/lib/axios/axios";
import type {
  CreateEducationRes,
  DeleteEducationRes,
  FetchEducationRes,
  FetchEducationsRes,
  UpdateEducationRes,
} from "../types/education.types";
import type {
  CreateEducationBody,
  EducationQuery,
  UpdateEducationBody,
} from "@dojo-portfolio/shared";

export const fetchEducations = async (params: EducationQuery) => {
  const { data } = await api.get<FetchEducationsRes>("/v1/education", {
    params,
  });

  return data;
};

export const fetchEducation = async (educationId: string) => {
  const { data } = await api.get<FetchEducationRes>(
    `/v1/education/${educationId}`,
  );

  return data;
};

export const createEducation = async (body: CreateEducationBody) => {
  const { data } = await api.post<CreateEducationRes>(`/v1/education`, body);

  return data;
};

export const updateEducation = async (
  educationId: string,
  body: UpdateEducationBody,
) => {
  const { data } = await api.patch<UpdateEducationRes>(
    `/v1/education/${educationId}`,
    body,
  );

  return data;
};

export const deleteEducation = async (educationId: string) => {
  const { data } = await api.delete<DeleteEducationRes>(
    `/v1/education/${educationId}`,
  );

  return data;
};
