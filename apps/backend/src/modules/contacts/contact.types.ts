import { ContactMessage } from "@dojo-portfolio/shared";
import { GetResult } from "../../types/common.types";

// =======================================
// RESULT
// =======================================

export type GetContactMessagesResult = GetResult<"messages", ContactMessage>;
