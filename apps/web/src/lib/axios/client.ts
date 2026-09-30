import { env } from "@/config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: env.environment === "production" ? env.apiUrl : env.devApiUrl,
  withCredentials: true,
  timeout: 10 * 1000,
});
