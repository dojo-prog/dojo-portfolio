import { useQuery } from "@tanstack/react-query";
import { fetchAllExperiences } from "../api/experience.api";

export const useAllExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetchAllExperiences();
      return res.data?.experiences;
    },
  });
};
