import { z } from "zod";
import {
  PaginationQuerySchema,
  SearchQuerySchema,
  UUIDSchema,
} from "../common";
import {
  MessageSchema,
  MessageSubjectSchema,
  SenderEmailSchema,
  SenderNameSchema,
} from "./message.schema";

// =======================================
// ENUM
// =======================================

export const ContactMessageAllowableSortSchema = z.enum(["newest", "oldest"]);

// =======================================
// PARAMS
// =======================================

export const ContactMessageIdParamsSchema = z.object({
  contactMessageId: UUIDSchema,
});

// =======================================
// QUERY
// =======================================

export const ContactMessageQuerySchema = z.object({
  ...PaginationQuerySchema.shape,

  search: SearchQuerySchema,
  sort: ContactMessageAllowableSortSchema.optional(),

  unread: z.enum(["true", "false"]).transform((value) => value === "true"),
});

// =======================================
// BODY
// =======================================

export const CreateContactMessageBodySchema = z.object({
  name: SenderNameSchema,
  email: SenderEmailSchema,
  subject: MessageSubjectSchema,
  message: MessageSchema,
});

export const UpdateContactMessageBodySchema = z.object({
  subject: MessageSubjectSchema,
  message: MessageSchema,
});

// =======================================
// TYPES
// =======================================

export type ContactMessageAllowableSort = z.infer<
  typeof ContactMessageAllowableSortSchema
>;

export type ContactMessageQuery = z.infer<typeof ContactMessageQuerySchema>;

export type CreateContactMessageBody = z.infer<
  typeof CreateContactMessageBodySchema
>;
export type UpdateContactMessageBody = z.infer<
  typeof UpdateContactMessageBodySchema
>;

export type CreateContactMessageInput = z.input<
  typeof CreateContactMessageBodySchema
>;
export type UpdateContactMessageInput = z.input<
  typeof UpdateContactMessageBodySchema
>;
