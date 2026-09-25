import express from "express";
import { protectRoute } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { projectWriteLimiter } from "./project.rate-limiter";
import { multerUpload } from "../../middlewares/multer.middleware";

import {
  CreateProjectBodySchema,
  ProjectIdParamsSchema,
  ProjectQuerySchema,
  UpdateProjectBodySchema,
  UpdateProjectSkillsBodySchema,
} from "@dojo-portfolio/shared";

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
  updateProjectSkills,
} from "./project.controller";

const router = express.Router();

router
  .route("/")
  .get(validate({ query: ProjectQuerySchema }), getProjects)
  .post(
    protectRoute,
    projectWriteLimiter,
    multerUpload.single("thumbnail"),
    validate({ body: CreateProjectBodySchema }),
    createProject,
  );

router
  .route("/:projectId")
  .get(validate({ params: ProjectIdParamsSchema }), getProjectById)
  .patch(
    protectRoute,
    projectWriteLimiter,
    multerUpload.single("thumbnail"),
    validate({ params: ProjectIdParamsSchema, body: UpdateProjectBodySchema }),
    updateProject,
  )
  .delete(
    protectRoute,
    projectWriteLimiter,
    validate({ params: ProjectIdParamsSchema }),
    deleteProject,
  );

router.route("/:projectId/skills").put(
  protectRoute,
  projectWriteLimiter,
  validate({
    params: ProjectIdParamsSchema,
    body: UpdateProjectSkillsBodySchema,
  }),
  updateProjectSkills,
);

export default router;
