import { useQuery } from "@tanstack/react-query";
import { fetchAllEducations } from "../api/education.api";

export const useAllEducations = () => {
  return useQuery({
    queryKey: ["educations"],
    queryFn: async () => {
      const res = await fetchAllEducations();
      return res.data?.educations;
    },
  });
};
