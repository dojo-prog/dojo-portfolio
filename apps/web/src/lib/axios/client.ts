import { env } from "@/config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  timeout: 10 * 1000,
});
