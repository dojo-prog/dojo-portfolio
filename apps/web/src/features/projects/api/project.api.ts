import { api } from "@/lib/axios/client";
import type { ProjectQuery } from "@dojo-portfolio/shared";
import type {
  FetchAllProjectsRes,
  FetchProjectRes,
  FetchProjectsRes,
} from "../types/project.types";

export const fetchProjects = async (params: ProjectQuery) => {
  const { data } = await api.get<FetchProjectsRes>("/v1/projects", { params });

  return data;
};

export const fetchAllProjects = async () => {
  const { data } = await api.get<FetchAllProjectsRes>("/v1/projects/all");

  return data;
};

export const fetchProject = async (projectId: string) => {
  const { data } = await api.get<FetchProjectRes>(`/v1/projects/${projectId}`);

  return data;
};
