import type { ApiResponse, PaginatedData } from "@/types/api.types";
import type { ContactMessage } from "@dojo-portfolio/shared";

// =======================================
// RESPONSE SHAPE
// =======================================

export type FetchContactMessagesRes = ApiResponse<FetchContactMessagesData>;

export type FetchContactMessageRes = ApiResponse<BaseContactMessageData>;

export type DeleteContactMessageRes = ApiResponse<BaseContactMessageData>;

export type ReadContactMessageRes = ApiResponse<BaseContactMessageData>;

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export type BaseContactMessageData = { message: ContactMessage };

export type FetchContactMessagesData = PaginatedData<
  "messages",
  ContactMessage
>;
