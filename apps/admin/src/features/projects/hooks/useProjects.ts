import type { ProjectQuery } from "@dojo-portfolio/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProjects } from "../api/project.api";

export const useProjects = (params: ProjectQuery) => {
  return useInfiniteQuery({
    queryKey: ["projects", params],
    queryFn: async ({ pageParam }) => {
      const res = await fetchProjects({ ...params, page: pageParam });

      return res.data;
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.pagination;

      if (!pagination) return undefined;

      const { page, total_pages } = pagination;

      if (page >= total_pages) return undefined;

      return page + 1;
    },
  });
};
