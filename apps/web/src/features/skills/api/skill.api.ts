import { api } from "@/lib/axios/client";
import type { SkillQuery } from "@dojo-portfolio/shared";
import type {
  FetchAllSkillsRes,
  FetchSkillRes,
  FetchSkillsRes,
} from "../types/skilltypes";

export const fetchSkills = async (params: SkillQuery) => {
  const { data } = await api.get<FetchSkillsRes>("/v1/skills", { params });

  return data;
};

export const fetchAllSkills = async () => {
  const { data } = await api.get<FetchAllSkillsRes>("/v1/skills/all");

  return data;
};

export const fetchSkill = async (skillId: string) => {
  const { data } = await api.get<FetchSkillRes>(`/v1/skills/${skillId}`);

  return data;
};
