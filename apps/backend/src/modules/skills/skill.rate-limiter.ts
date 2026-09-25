import rateLimit from "express-rate-limit";

export const skillWriteLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many write attempts. Please try again later.",
  },
});
