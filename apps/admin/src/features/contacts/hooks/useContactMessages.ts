import type { ContactMessageQuery } from "@dojo-portfolio/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchContactMessages } from "../api/contact.api";

export const useContactMessages = (params: ContactMessageQuery) => {
  return useInfiniteQuery({
    queryKey: ["contact-messages", params],
    queryFn: ({ pageParam }) =>
      fetchContactMessages({ ...params, page: pageParam }),

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
