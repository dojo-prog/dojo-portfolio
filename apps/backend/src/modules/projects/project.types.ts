import type {
  CreateProjectBody,
  Project,
  ProjectStatus,
  UpdateProjectBody,
} from "@dojo-portfolio/shared";
import { GetResult, UpdateResult } from "../../types/common.types";

// =======================================
// SERVICE PARAMS
// =======================================

export type PayloadWithThumbnail<T extends object> = T & {
  thumbnailUrl?: string;
  thumbnailPublicId?: string;
};

export type CreateProjectParams = {
  thumbnail?: Express.Multer.File;
  payload: PayloadWithThumbnail<CreateProjectBody>;
};

export type UpdateProjectParams = {
  projectId: string;
  thumbnail?: Express.Multer.File;
  payload: PayloadWithThumbnail<UpdateProjectBody>;
};

export type UpdateProjectSkillsParams = {
  projectId: string;
  skillIds: string[];
};

// =======================================
// RESULT
// =======================================

export type GetProjectResult = GetResult<"projects", Project>;

export type UpdateProjectResult = UpdateResult<"projects", Project>;
