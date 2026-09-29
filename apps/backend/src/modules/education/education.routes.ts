import express from "express";
import { validate } from "../../middlewares/validation.middleware";
import { protectRoute } from "../../middlewares/auth.middleware";
import { educationWriteLimiter } from "./education.rate-limiter";

import {
  CreateEducationBodySchema,
  EducationIdParamsSchema,
  EducationQuerySchema,
  UpdateEducationBodySchema,
} from "@dojo-portfolio/shared";

import {
  createEducation,
  deleteEducation,
  getAllEducations,
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

router.get("/all", getAllEducations);

router
  .route("/:educationId")
  .get(validate({ params: EducationIdParamsSchema }), getEducationById)
  .patch(
    protectRoute,
    educationWriteLimiter,
    validate({
      params: EducationIdParamsSchema,
      body: UpdateEducationBodySchema,
    }),
    updateEducation,
  )
  .delete(
    protectRoute,
    educationWriteLimiter,
    validate({ params: EducationIdParamsSchema }),
    deleteEducation,
  );

export default router;
