import {
  CreateProjectBody,
  ProjectQuerySchema,
  UpdateProjectBody,
} from "@dojo-portfolio/shared";
import { Controller } from "../../types/handler.types";

import * as projectService from "./project.service";

export const getProjects: Controller = async (req, res, next) => {
  try {
    const data = await projectService.getProjects(
      ProjectQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getAllProjects: Controller = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();

    res.status(200).json({ success: true, data: { projects } });
  } catch (error) {
    next(error);
  }
};

export const getProjectById: Controller = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(
      req.params.projectId as string,
    );

    res.status(200).json({ success: true, data: { project } });
  } catch (error) {
    next(error);
  }
};

export const createProject: Controller = async (req, res, next) => {
  try {
    const thumbnail = req.file;

    const project = await projectService.createProject({
      thumbnail,
      payload: req.body as CreateProjectBody,
    });

    res.status(201).json({ success: true, data: { project } });
  } catch (error) {
    next(error);
  }
};

export const updateProject: Controller = async (req, res, next) => {
  try {
    const thumbnail = req.file;

    const project = await projectService.updateProject({
      projectId: req.params.projectId as string,
      thumbnail,
      payload: req.body as UpdateProjectBody,
    });

    res.status(200).json({ success: true, data: { project } });
  } catch (error) {
    next(error);
  }
};

export const deleteProject: Controller = async (req, res, next) => {
  try {
    const project = await projectService.deleteProject(
      req.params.projectId as string,
    );

    res.status(200).json({ success: true, data: { project } });
  } catch (error) {
    next(error);
  }
};

export const updateProjectSkills: Controller = async (req, res, next) => {
  try {
    const project = await projectService.updateProjectSkills({
      projectId: req.params.projectId as string,
      skillIds: req.body.skillIds,
    });

    res.status(200).json({ success: true, data: { project } });
  } catch (error) {
    next(error);
  }
};
