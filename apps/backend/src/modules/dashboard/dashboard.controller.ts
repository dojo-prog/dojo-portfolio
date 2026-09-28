import { Controller } from "../../types/handler.types";

import * as dashboardService from "./dashboard.service";

export const getOverview: Controller = async (req, res, next) => {
  try {
    const dashboardOverview = await dashboardService.getOverview();

    res.status(200).json({ success: true, data: { dashboardOverview } });
  } catch (error) {
    next(error);
  }
};
