import { useQuery } from "@tanstack/react-query";
import { fetchProject } from "../api/project.api";

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProject(productId),
  });
};
