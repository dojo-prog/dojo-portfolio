import axios, { type InternalAxiosRequestConfig } from "axios";
import { api, refreshApi } from "./axios";
import { toast } from "sonner";
import { ApiError } from "./ApiError";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const refreshAccessToken = async () => {
  await refreshApi.post("/v1/auth/refresh");
};

const logout = async () => {
  await api.post("/v1/auth/logout");

  toast.info("Session expired. You have been logged out.");
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const config = error.config as RetryableRequestConfig | undefined;

    if (error.response?.status === 401 && config && !config._retry) {
      config._retry = true;

      try {
        await refreshAccessToken();

        return api(config);
      } catch (error) {
        await logout();
      }
    }

    const response = error.response;

    return Promise.reject(
      new ApiError(
        response?.data?.message ?? "Something went wrong",
        response?.status,
        response?.data?.code,
        response?.data,
      ),
    );
  },
);
