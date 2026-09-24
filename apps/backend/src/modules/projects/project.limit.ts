import rateLimit from "express-rate-limit";

export const projectWriteLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  legacyHeaders: false,
  standardHeaders: true,
  message: {
    success: false,
    message: "Too many write attempts, please try again later.",
  },
});
