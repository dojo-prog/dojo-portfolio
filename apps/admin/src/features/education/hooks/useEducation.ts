import { useQuery } from "@tanstack/react-query";
import { fetchEducation } from "../api/education.api";

export const useEducation = (educationId: string) => {
  return useQuery({
    queryKey: ["educations", educationId],
    queryFn: async () => {
      const res = await fetchEducation(educationId);
      return res.data?.education;
    },
  });
};
