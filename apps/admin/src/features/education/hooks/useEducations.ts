import type { EducationQuery } from "@dojo-portfolio/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchEducations } from "../api/education.api";

export const useEducation = (params: EducationQuery) => {
  return useInfiniteQuery({
    queryKey: ["educations", params],
    queryFn: ({ pageParam }) => fetchEducations({ ...params, page: pageParam }),

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
