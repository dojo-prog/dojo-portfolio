import type { ContactMessageQuery } from "@dojo-portfolio/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchContactMessages } from "../api/contact.api";

export const useContactMessages = (params: ContactMessageQuery) => {
  return useInfiniteQuery({
    queryKey: ["contact-messages", params],
    queryFn: async ({ pageParam }) => {
      const res = await fetchContactMessages({ ...params, page: pageParam });
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
