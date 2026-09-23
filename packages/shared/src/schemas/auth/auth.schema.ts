import { z } from "zod";
import { UserEmailSchema } from "../users/user.schema";

// =======================================
// REUSABLE FIELDS
// =======================================

export const AuthEmailSchema = UserEmailSchema;

export const LoginPasswordSchema = z
  .string()
  .min(1, { message: "Password is required" });

export const RegisterPasswordSchema = z
  .string()
  .min(8, { message: "Password must at least be 8 characters long" });

export const ConfirmPasswordSchema = z
  .string()
  .min(1, { message: "Confirmation password is required" });
