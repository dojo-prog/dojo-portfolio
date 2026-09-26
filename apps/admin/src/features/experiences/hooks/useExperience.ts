import { useQuery } from "@tanstack/react-query";
import { fetchExperience } from "../api/experience.api";

export const useExperience = (experienceId: string) => {
  return useQuery({
    queryKey: ["experiences", experienceId],
    queryFn: () => fetchExperience(experienceId),
  });
};
