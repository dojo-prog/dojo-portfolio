import rateLimit from "express-rate-limit";

export const educationWriteLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many education write attempts. Please try again later.",
  },
});
