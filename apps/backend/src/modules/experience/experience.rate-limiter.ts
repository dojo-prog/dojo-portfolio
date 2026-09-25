import rateLimit from "express-rate-limit";

export const experienceWriteLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many experience write attempts. Please try again later.",
  },
});
