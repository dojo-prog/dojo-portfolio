import { api } from "@/lib/axios/axios";
import type {
  GetCurrentUserResponse,
  LoginResponse,
  RegisterResponse,
} from "../types/auth.types";
import type { LoginBody, RegisterBody } from "@dojo-portfolio/shared";

export const getCurrentUser = async () => {
  const { data } = await api.get<GetCurrentUserResponse>("/v1/auth/me");

  return data;
};

export const login = async (body: LoginBody) => {
  const { data } = await api.post<LoginResponse>("/v1/auth/login", body);

  return data;
};

export const register = async (body: RegisterBody) => {
  const { data } = await api.post<RegisterResponse>("/v1/auth/register", body);

  return data;
};

export const logout = async () => {
  await api.post("/v1/auth/logout");
};
