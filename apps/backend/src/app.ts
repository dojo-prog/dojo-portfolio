import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware";
import { globalRateLimiter } from "./infrastructure/rate-limit/global-rate-limiter";

import authRouter from "./modules/auth/auth.routes";
import projectRouter from "./modules/projects/project.routes";
import skillRouter from "./modules/skills/skill.routes";
import experienceRouter from "./modules/experience/experience.routes";
import educationRouter from "./modules/education/education.routes";
import contactRouter from "./modules/contacts/contact.routes";

const app = express();

// Cors Config
const allowedOrigins = [ENV.CLIENT_URL, ENV.ADMIN_CLIENT_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Parsers
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Global Rate Limiter
app.use(globalRateLimiter);

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/experience", experienceRouter);
app.use("/api/v1/education", educationRouter);
app.use("/api/v1/contacts", contactRouter);

// Error Handler
app.use(errorMiddleware);

export { app };
