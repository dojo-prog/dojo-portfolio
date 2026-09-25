import { ProjectQuery, ProjectWithRelations } from "@dojo-portfolio/shared";
import {
  CreateProjectParams,
  GetProjectResult,
  UpdateProjectParams,
} from "./project.types";
import { calculateTotalPages } from "../../utils/calculateTotalPages";
import { AppError } from "../../utils/errors/AppError";
import { uploadMulterImage } from "../../infrastructure/cloudinary/upload";
import { deleteImage } from "../../infrastructure/cloudinary/delete";

import * as projectRepository from "./project.repository";

// =======================================
// Queries
// =======================================

export const getProjects = async (
  query: ProjectQuery,
): Promise<GetProjectResult> => {
  const { projects, total } = await projectRepository.find(query);

  const { page, limit } = query;

  return {
    projects,
    pagination: {
      page,
      limit,
      total,
      total_pages: calculateTotalPages(total, limit),
    },
  };
};

export const getProjectById = async (
  projectId: string,
): Promise<ProjectWithRelations> => {
  const project = await projectRepository.findWithRelationsById(projectId);

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  return project;
};

// =======================================
// Mutations
// =======================================

export const createProject = async (
  params: CreateProjectParams,
): Promise<ProjectWithRelations> => {
  const { thumbnail, payload } = params;

  if (thumbnail) {
    const { url, public_id } = await uploadMulterImage(
      thumbnail,
      "project-thumbnails",
    );

    payload.thumbnailUrl = url;
    payload.thumbnailPublicId = public_id;
  }

  return projectRepository.add(payload);
};

export const updateProject = async (
  params: UpdateProjectParams,
): Promise<ProjectWithRelations> => {
  const { projectId, thumbnail, payload } = params;

  const project = await projectRepository.findById(projectId);

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  if (thumbnail) {
    const { url, public_id } = await uploadMulterImage(
      thumbnail,
      "project-thumbnails",
    );

    payload.thumbnailUrl = url;
    payload.thumbnailPublicId = public_id;
  }

  const updatedProject = await projectRepository.update(project, payload);

  if (thumbnail && project.thumbnail_public_id) {
    await deleteImage(project.thumbnail_public_id);
  }

  return updatedProject;
};

export const deleteProject = async (
  projectId: string,
): Promise<ProjectWithRelations> => {
  const project = await projectRepository.findWithRelationsById(projectId);

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  await projectRepository.remove(projectId);

  return project;
};
