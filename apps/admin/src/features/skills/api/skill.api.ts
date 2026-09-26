import { api } from "@/lib/axios/axios";
import type { CreateSkillBody, SkillQuery } from "@dojo-portfolio/shared";

import type {
  CreateSkillRes,
  DeleteSkillRes,
  FetchSkillRes,
  FetchSkillsRes,
} from "../types/skill.types";

export const fetchSkills = async (params: SkillQuery) => {
  const { data } = await api.get<FetchSkillsRes>("/v1/skills", { params });

  return data;
};

export const fetchSkill = async (skillId: string) => {
  const { data } = await api.get<FetchSkillRes>(`/v1/skills/${skillId}`);

  return data;
};

export const createSkill = async (body: CreateSkillBody) => {
  const { data } = await api.post<CreateSkillRes>(`/v1/skills`, body);

  return data;
};

export const deleteSkill = async (skillId: string) => {
  const { data } = await api.delete<DeleteSkillRes>(`/v1/skills/${skillId}`);

  return data;
};
