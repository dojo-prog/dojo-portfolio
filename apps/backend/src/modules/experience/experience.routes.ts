import express from "express";
import { validate } from "../../middlewares/validation.middleware";
import { experienceWriteLimiter } from "./experience.rate-limiter";
import { protectRoute } from "../../middlewares/auth.middleware";

import {
  CreateExperienceBodySchema,
  ExperienceIdParamsSchema,
  ExperienceQuerySchema,
  UpdateExperienceBodySchema,
} from "@dojo-portfolio/shared";

import {
  createExperience,
  deleteExperience,
  getExperienceById,
  getExperiences,
  updateExperience,
} from "./experience.controller";

const router = express.Router();

router
  .route("/")
  .get(validate({ query: ExperienceQuerySchema }), getExperiences)
  .post(
    protectRoute,
    experienceWriteLimiter,
    validate({ body: CreateExperienceBodySchema }),
    createExperience,
  );

router
  .route("/:experienceId")
  .get(validate({ params: ExperienceIdParamsSchema }), getExperienceById)
  .patch(
    protectRoute,
    experienceWriteLimiter,
    validate({
      params: ExperienceIdParamsSchema,
      body: UpdateExperienceBodySchema,
    }),
    updateExperience,
  )
  .delete(
    protectRoute,
    experienceWriteLimiter,
    validate({ params: ExperienceIdParamsSchema }),
    deleteExperience,
  );

export default router;
