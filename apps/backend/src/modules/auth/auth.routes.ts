import express from "express";
import { protectRoute } from "../../middlewares/auth.middleware";
import { loginRateLimiter, registerRateLimiter } from "./auth.rate-limiter";
import { validate } from "../../middlewares/validation.middleware";
import { LoginBodySchema, RegisterBodySchema } from "@dojo-portfolio/shared";

import {
  getCurrentUser,
  login,
  logout,
  refreshAccessToken,
  register,
} from "./auth.controller";

const router = express.Router();

router.get("/me", protectRoute, getCurrentUser);
router.post(
  "/login",
  loginRateLimiter,
  validate({ body: LoginBodySchema }),
  login,
);
router.post(
  "/register",
  registerRateLimiter,
  validate({ body: RegisterBodySchema }),
  register,
);
router.post("/logout", logout);
router.post("/refresh-access", refreshAccessToken);

export default router;
