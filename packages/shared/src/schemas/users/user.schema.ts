import { z } from "zod";
import { IsoDatetimeSchema, UUIDSchema } from "../common";

// =======================================
// REUSABLE FIELDS
// =======================================

export const UserEmailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .max(100, { message: "Email cannot exceed 100 characters" })
  .email({ message: "Invalid email format" })
  .toLowerCase();

// =======================================
// ENTITY
// =======================================

export const UserPrivateSchema = z.object({
  id: UUIDSchema,
  email: UserEmailSchema,
  password_hash: z.string(),
  created_at: IsoDatetimeSchema,
  updated_at: IsoDatetimeSchema,
});

export const UserPublicSchema = UserPrivateSchema.omit({ password_hash: true });

// =======================================
// TYPES
// =======================================

export type UserPrivate = z.infer<typeof UserPrivateSchema>;

export type UserPublic = z.infer<typeof UserPublicSchema>;
