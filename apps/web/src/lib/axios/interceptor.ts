import axios from "axios";
import { api } from "./client";
import { ApiError } from "@/utils/errors/ApiError";

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const response = error.response;

    return Promise.reject(
      new ApiError(
        response?.data.message ?? "Something went wrong",
        response?.status,
        response?.data.code,
        response?.data,
      ),
    );
  },
);
