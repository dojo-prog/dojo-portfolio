import axios from "axios";
import { env } from "@/config/env";

const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  timeout: 10 * 1000,
});

const refreshApi = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  timeout: 10 * 1000,
});

export { api, refreshApi };
