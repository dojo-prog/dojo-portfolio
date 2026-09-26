import express from "express";
import { validate } from "../../middlewares/validation.middleware";
import { protectRoute } from "../../middlewares/auth.middleware";
import { educationWriteLimiter } from "./education.rate-limiter";

import {
  CreateEducationBodySchema,
  EducationIdParamsSchema,
  EducationQuerySchema,
} from "@dojo-portfolio/shared";

import {
  createEducation,
  deleteEducation,
  getEducationById,
  getEducations,
  updateEducation,
} from "./education.controller";

const router = express.Router();

router
  .route("/")
  .get(validate({ query: EducationQuerySchema }), getEducations)
  .post(
    protectRoute,
    educationWriteLimiter,
    validate({ body: CreateEducationBodySchema }),
    createEducation,
  );

router
  .route("/:educationId")
  .get(validate({ params: EducationIdParamsSchema }), getEducationById)
  .patch(
    protectRoute,
    educationWriteLimiter,
    validate({ params: EducationIdParamsSchema }),
    updateEducation,
  )
  .delete(
    protectRoute,
    educationWriteLimiter,
    validate({ params: EducationIdParamsSchema }),
    deleteEducation,
  );

export default router;
