import type { SkillQuery } from "@dojo-portfolio/shared";
import { useQuery } from "@tanstack/react-query";
import { fetchSkills } from "../api/skill.api";

export const useSkills = (params: SkillQuery) => {
  return useQuery({
    queryKey: ["skills-query", params],
    queryFn: async () => {
      const res = await fetchSkills(params);
      return res.data?.skills;
    },
  });
};
