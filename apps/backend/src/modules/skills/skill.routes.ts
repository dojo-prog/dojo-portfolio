import express from "express";
import { protectRoute } from "../../middlewares/auth.middleware";
import { skillWriteLimiter } from "./skill.rate-limiter";
import { validate } from "../../middlewares/validation.middleware";
import {
  CreateSkillBodySchema,
  SkillIdParamsSchema,
  SkillQuerySchema,
} from "@dojo-portfolio/shared";
import {
  createSkill,
  deleteSkill,
  getAllSkills,
  getSkillById,
  getSkills,
} from "./skill.controller";

const router = express.Router();

router
  .route("/")
  .get(validate({ query: SkillQuerySchema }), getSkills)
  .post(
    protectRoute,
    skillWriteLimiter,
    validate({ body: CreateSkillBodySchema }),
    createSkill,
  );

router.get("/all", getAllSkills);

router
  .route("/:skillId")
  .get(validate({ params: SkillIdParamsSchema }), getSkillById)
  .delete(
    protectRoute,
    skillWriteLimiter,
    validate({ params: SkillIdParamsSchema }),
    deleteSkill,
  );

export default router;
