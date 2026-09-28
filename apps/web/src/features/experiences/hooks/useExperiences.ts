import type { ExperienceQuery } from "@dojo-portfolio/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchExperiences } from "../api/experience.api";

export const useExperiences = (params: ExperienceQuery) => {
  return useInfiniteQuery({
    queryKey: ["paginated-experiences", params],
    queryFn: async ({ pageParam }) => {
      const res = await fetchExperiences({ ...params, page: pageParam });

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
