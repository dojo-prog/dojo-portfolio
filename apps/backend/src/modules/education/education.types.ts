import { EducationEntity, UpdateEducationBody } from "@dojo-portfolio/shared";
import { GetResult } from "../../types/common.types";

// =======================================
// SERVICE PARAMS
// =======================================

export type UpdateEducationParams = {
  educationId: string;
  payload: UpdateEducationBody;
};

// =======================================
// RESULT
// =======================================

export type GetEducationResult = GetResult<"educations", EducationEntity>;
