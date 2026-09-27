import { useQuery } from "@tanstack/react-query";
import { fetchSkills } from "../api/skill.api";
import type { SkillQuery } from "@dojo-portfolio/shared";

export const useSkills = (params: SkillQuery) => {
  return useQuery({
    queryKey: ["skills", params],
    queryFn: async () => {
      const res = await fetchSkills(params);
      return res.data?.skills;
    },
  });
};
