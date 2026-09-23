import { email, z } from "zod";
import {
  AuthEmailSchema,
  ConfirmPasswordSchema,
  LoginPasswordSchema,
  RegisterPasswordSchema,
} from "./auth.schema";

// =======================================
// BODY
// =======================================

export const RegisterBodySchema = z
  .object({
    email: AuthEmailSchema,
    password: RegisterPasswordSchema,
    confirm_password: ConfirmPasswordSchema,
  })
  .refine((data) => data.confirm_password === data.password, {
    message: "Password does not match",
    path: ["confirm_password"],
  });

export const LoginBodySchema = z.object({
  email: AuthEmailSchema,
  password: LoginPasswordSchema,
});

// =======================================
// TYPES
// =======================================

export type RegisterInput = z.input<typeof RegisterBodySchema>;

export type LoginInput = z.input<typeof LoginBodySchema>;

export type RegisterBody = z.infer<typeof RegisterBodySchema>;

export type LoginBody = z.infer<typeof LoginBodySchema>;
