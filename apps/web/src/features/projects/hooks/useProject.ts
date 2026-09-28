import { useQuery } from "@tanstack/react-query";
import { fetchProject } from "../api/projects.api";

export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => {
      const res = await fetchProject(projectId);
      return res.data?.project;
    },
  });
};
