import { api } from "@/lib/axios/axios";

import type {
  CreateProjectBody,
  ProjectQuery,
  UpdateProjectBody,
  UpdateProjectSkillsBody,
} from "@dojo-portfolio/shared";

import type {
  CreateProjectRes,
  DeleteProjectRes,
  FetchProjectRes,
  FetchProjectsRes,
  UpdateProjectRes,
  UpdateProjectSkillsRes,
} from "../types/project.types";

export const fetchProjects = async (params: ProjectQuery) => {
  const { data } = await api.get<FetchProjectsRes>("/v1/projects", { params });

  return data;
};

export const fetchProject = async (projectId: string) => {
  const { data } = await api.get<FetchProjectRes>(`/v1/projects/${projectId}`);

  return data;
};

export const createProject = async (
  body: CreateProjectBody & { thumbnail?: File },
) => {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const { data } = await api.post<CreateProjectRes>("/v1/projects", formData);

  return data;
};

export const updateProject = async (
  projectId: string,
  body: UpdateProjectBody & { thumbnail?: File },
) => {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const { data } = await api.patch<UpdateProjectRes>(
    `/v1/projects/${projectId}`,
    formData,
  );

  return data;
};

export const deleteProject = async (projectId: string) => {
  const { data } = await api.delete<DeleteProjectRes>(
    `/v1/projects/${projectId}`,
  );

  return data;
};

export const updateProjectSkills = async (
  projectId: string,
  body: UpdateProjectSkillsBody,
) => {
  const { data } = await api.put<UpdateProjectSkillsRes>(
    `/v1/projects/${projectId}`,
    body,
  );

  return data;
};
