import { api } from "@/lib/axios/axios";

import type {
  CreateProjectBody,
  ProjectQuery,
  UpdateProjectBody,
} from "@dojo-portfolio/shared";

import type {
  CreateProjectRes,
  DeleteProjectRes,
  FetchProjectRes,
  FetchProjectsRes,
  UpdateProjectRes,
} from "../types/project.types";

export const fetchProjects = async (params: ProjectQuery) => {
  const { data } = await api.get<FetchProjectsRes>("/v1/projects", { params });

  return data;
};

export const fetchProject = async (projectId: string) => {
  const { data } = await api.get<FetchProjectRes>(`/v1/projects/${projectId}`);

  return data;
};

export const createProject = async (body: CreateProjectBody) => {
  const { data } = await api.post<CreateProjectRes>("/v1/projects", body);

  return data;
};

export const updateProject = async (
  projectId: string,
  body: UpdateProjectBody,
) => {
  const { data } = await api.patch<UpdateProjectRes>(
    `/v1/projects/${projectId}`,
    body,
  );

  return data;
};

export const deleteProject = async (projectId: string) => {
  const { data } = await api.delete<DeleteProjectRes>(
    `/v1/projects/${projectId}`,
  );

  return data;
};
