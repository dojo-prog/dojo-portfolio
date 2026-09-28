import { useQuery } from "@tanstack/react-query";
import { fetchSkill } from "../api/skill.api";

export const useSkill = (skillId: string) => {
  return useQuery({
    queryKey: ["skills", skillId],
    queryFn: async () => {
      const res = await fetchSkill(skillId);
      return res.data?.skill;
    },
  });
};
