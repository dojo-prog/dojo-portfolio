import { api } from "@/lib/axios/axios";
import type { ContactMessageQuery } from "@dojo-portfolio/shared";
import type {
  DeleteContactMessageRes,
  FetchContactMessageRes,
  FetchContactMessagesRes,
  ReadContactMessageRes,
} from "../types/contact.types";

export const fetchContactMessages = async (params: ContactMessageQuery) => {
  const { data } = await api.get<FetchContactMessagesRes>(
    "/v1/contacts/messages",
    { params },
  );

  return data;
};

export const fetchContactMessage = async (contactMessageId: string) => {
  const { data } = await api.get<FetchContactMessageRes>(
    `/v1/contacts/messages/${contactMessageId}`,
  );

  return data;
};

export const deleteContactMessage = async (contactMessageId: string) => {
  const { data } = await api.delete<DeleteContactMessageRes>(
    `/v1/contacts/messages/${contactMessageId}`,
  );

  return data;
};

export const readContactMessage = async (contactMessageId: string) => {
  const { data } = await api.get<ReadContactMessageRes>(
    `/v1/contacts/messages/${contactMessageId}`,
  );

  return data;
};
