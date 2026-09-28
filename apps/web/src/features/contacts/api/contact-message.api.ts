import { api } from "@/lib/axios/client";
import type { CreateContactMessageBody } from "@dojo-portfolio/shared";

export const createMessage = async (body: CreateContactMessageBody) => {
  await api.post("/v1/contacts/messages", body);
};
