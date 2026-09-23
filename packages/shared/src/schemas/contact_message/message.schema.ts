import { z } from "zod";
import { IsoDatetimeSchema, UUIDSchema } from "../common";

// =======================================
// REUSABLE FIELDS
// =======================================

export const SenderNameSchema = z
  .string()
  .min(1, { message: "Kindly include your name" })
  .max(150, { message: "Sender name cannot exceed 150 characters" });

export const SenderEmailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .max(200, { message: "Email cannot exceed 200 characters" })
  .email({ message: "Invalid email format" });

export const MessageSubjectSchema = z
  .string()
  .max(200, { message: "Message subject cannot exceed 200 characters" });

export const MessageSchema = z
  .string()
  .min(1, { message: "Message is required" })
  .max(2040, { message: "Message cannot exceed 2040 characters" });

// =======================================
// ENTITY
// =======================================

export const ContantMessageEntitySchema = z.object({
  id: UUIDSchema,
  name: SenderNameSchema,
  email: SenderEmailSchema,
  subject: MessageSubjectSchema,
  message: MessageSchema,
  created_at: IsoDatetimeSchema,
  updated_at: IsoDatetimeSchema.nullable(),
  read_at: z.boolean(),
});

// =======================================
// TYPES
// =======================================

export type ContactMessage = z.infer<typeof ContantMessageEntitySchema>;
