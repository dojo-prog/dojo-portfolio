import {
  ContactMessage,
  ContactMessageQuery,
  CreateContactMessageBody,
} from "@dojo-portfolio/shared";
import { GetContactMessagesResult } from "./contact.types";
import { calculateTotalPages } from "../../utils/calculateTotalPages";
import { AppError } from "../../utils/errors/AppError";

import * as contactRepository from "./contact.repository";

export const getContactMessages = async (
  query: ContactMessageQuery,
): Promise<GetContactMessagesResult> => {
  const { messages, total } = await contactRepository.find(query);

  const { page, limit } = query;

  return {
    messages,
    pagination: {
      page,
      limit,
      total,
      total_pages: calculateTotalPages(total, limit),
    },
  };
};

export const getContactMessageById = async (
  contactMessageId: string,
): Promise<ContactMessage> => {
  const message = await contactRepository.findById(contactMessageId);

  if (!message) {
    throw new AppError(404, "Contact message not found");
  }
  return message;
};

export const createContactMessage = async (
  payload: CreateContactMessageBody,
): Promise<ContactMessage> => {
  return contactRepository.add(payload);
};

export const deleteContactMessage = async (
  contactMessageId: string,
): Promise<ContactMessage> => {
  const deletedMessage = await contactRepository.remove(contactMessageId);

  if (!deletedMessage) {
    throw new AppError(404, "Contact message not found");
  }

  return deletedMessage;
};

export const readContactMessage = async (
  contactMessageId: string,
): Promise<ContactMessage> => {
  const message = await contactRepository.findById(contactMessageId);

  if (!message) {
    throw new AppError(404, "Contact message not found");
  }

  if (message.read_at) return message;

  return contactRepository.readMessage(contactMessageId);
};
