import express from "express";
import { protectRoute } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { contactMessageWriteLimiter } from "./contact.rate-limiter";

import {
  ContactMessageIdParamsSchema,
  ContactMessageQuerySchema,
  CreateContactMessageBodySchema,
} from "@dojo-portfolio/shared";

import {
  createContactMessage,
  deleteContactMessage,
  getContactMessageById,
  getContactMessages,
} from "./contact.controller";

const router = express.Router();

router
  .route("/")
  .get(
    protectRoute,
    validate({ query: ContactMessageQuerySchema }),
    getContactMessages,
  )
  .post(
    contactMessageWriteLimiter,
    validate({ body: CreateContactMessageBodySchema }),
    createContactMessage,
  );

router
  .route("/:contactMessageId")
  .get(
    protectRoute,
    validate({ params: ContactMessageIdParamsSchema }),
    getContactMessageById,
  )
  .delete(
    protectRoute,
    validate({ params: ContactMessageIdParamsSchema }),
    deleteContactMessage,
  );

export default router;
