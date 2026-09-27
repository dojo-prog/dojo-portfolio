import { useQuery } from "@tanstack/react-query";
import { fetchProject } from "../api/project.api";

export const useProject = (productId: string) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const res = await fetchProject(productId);

      return res.data?.project;
    },
  });
};
