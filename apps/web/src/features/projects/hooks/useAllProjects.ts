import { useQuery } from "@tanstack/react-query";
import { fetchAllProjects } from "../api/projects.api";

export const useAllProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetchAllProjects();
      return res?.data?.projects;
    },
  });
};
