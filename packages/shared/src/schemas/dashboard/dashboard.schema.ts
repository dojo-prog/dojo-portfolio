import { z } from "zod";
import { NonNegativeIntSchema } from "../common";
import { ContantMessageEntitySchema } from "../contact_message";

// =======================================
// RESPONSE DATA SHAPE
// =======================================

export const DashboardOverviewSchema = z.object({
  stats: z.object({
    projects: NonNegativeIntSchema,
    featured_projects: NonNegativeIntSchema,
    skills: NonNegativeIntSchema,
    experiences: NonNegativeIntSchema,
    unread_messages: NonNegativeIntSchema,
  }),
  recent_messages: z.array(ContantMessageEntitySchema),
});

// =======================================
// TYPES
// =======================================

export type DashboardOverview = z.infer<typeof DashboardOverviewSchema>;
