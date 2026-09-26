import type { ExperienceQuery } from "@dojo-portfolio/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchExperiences } from "../api/experience.api";

export const useExperiences = (params: ExperienceQuery) => {
  return useInfiniteQuery({
    queryKey: ["experiences", params],
    queryFn: ({ pageParam }) =>
      fetchExperiences({ ...params, page: pageParam }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data?.pagination;

      if (!pagination) return undefined;

      const { page, total_pages } = pagination;

      if (page >= total_pages) return undefined;

      return page + 1;
    },
  });
};
