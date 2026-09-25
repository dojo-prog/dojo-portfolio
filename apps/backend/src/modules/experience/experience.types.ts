import { ExperienceEntity, UpdateExperienceBody } from "@dojo-portfolio/shared";
import { GetResult } from "../../types/common.types";

// =======================================
// SERVICE PARAMS
// =======================================

export type UpdateExperienceParams = {
  experienceId: string;
  payload: UpdateExperienceBody;
};

// =======================================
// RESULT
// =======================================

export type GetExperienceResult = GetResult<"experiences", ExperienceEntity>;
