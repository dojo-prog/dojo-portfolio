import express from "express";
import { protectRoute } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import {
  CreateProjectBodySchema,
  ProjectIdParamsSchema,
  ProjectQuerySchema,
  UpdateProjectBodySchema,
} from "@dojo-portfolio/shared";
import { projectWriteLimiter } from "./project.rate-limiter";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "./project.controller";
import { multerUpload } from "../../middlewares/multer.middleware";

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

export default router;
