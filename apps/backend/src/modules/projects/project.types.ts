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

export type CreateProjectParams = {
  thumbnail?: Express.Multer.File;
  payload: CreateProjectBody;
};

export type UpdateProjectParams = {
  projectId: string;
  thumbnail?: Express.Multer.File;
  payload: UpdateProjectBody;
};

// =======================================
// REPOSITORY DATA
// =======================================

export interface CreateProjectData {
  title: string;
  short_description: string;
  description: string;
  problem?: string;
  solution?: string;
  github_url?: string;
  live_url?: string;
  featured: boolean;
  status?: ProjectStatus;
  start_date: Date;
  end_data: Date;

  thumbnail_url?: string;
  thumbnail_public_id?: string;
}

export interface UpdateProjectData extends CreateProjectData {}

// =======================================
// RESULT
// =======================================

export type GetProjectResult = GetResult<"projects", Project>;

export type UpdateProjectResult = UpdateResult<"projects", Project>;
