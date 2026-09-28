import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchEducations } from "../api/education.api";
import type { EducationQuery } from "@dojo-portfolio/shared";

export const useEducations = (params: EducationQuery) => {
  return useInfiniteQuery({
    queryKey: ["paginated-educations", params],
    queryFn: async ({ pageParam }) => {
      const res = await fetchEducations({ ...params, page: pageParam });

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
