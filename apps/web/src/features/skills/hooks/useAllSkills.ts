import { useQuery } from "@tanstack/react-query";
import { fetchAllSkills } from "../api/skill.api";

export const useAllSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await fetchAllSkills();
      return res.data?.skills;
    },
  });
};
