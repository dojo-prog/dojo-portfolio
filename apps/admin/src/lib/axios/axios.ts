import axios from "axios";
import { env } from "@/config/env";

const api = axios.create({
  baseURL: env.environment === "production" ? env.apiUrl : env.devApiUrl,
  withCredentials: true,
  timeout: 10 * 1000,
});

const refreshApi = axios.create({
  baseURL: env.environment === "production" ? env.apiUrl : env.devApiUrl,
  withCredentials: true,
  timeout: 10 * 1000,
});

export { api, refreshApi };
