import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware";
import { globalRateLimiter } from "./infrastructure/rate-limit/global-rate-limiter";

const app = express();

// Cors Config

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

// Parsers

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Global Rate Limiter
app.use(globalRateLimiter);

// Routers

// Error Handler
app.use(errorMiddleware);

export { app };
