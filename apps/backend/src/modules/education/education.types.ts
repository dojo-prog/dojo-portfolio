import { EducationEntity } from "@dojo-portfolio/shared";
import { GetResult } from "../../types/common.types";

// =======================================
// RESULT
// =======================================

export type GetEducationResult = GetResult<"educations", EducationEntity>;
