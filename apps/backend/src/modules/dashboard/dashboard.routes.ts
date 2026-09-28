import express from "express";
import { protectRoute } from "../../middlewares/auth.middleware";
import { getOverview } from "./dashboard.controller";

const router = express.Router();

router.use(protectRoute);

router.get("/overview", getOverview);

export default router;
