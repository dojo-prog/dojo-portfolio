import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import cookieParser from "cookie-parser";

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

// Routers

// Error Handler

export { app };
