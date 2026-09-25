import rateLimit from "express-rate-limit";

export const contactMessageWriteLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many message attempts. Please try again later.",
  },
});
