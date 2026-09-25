import {
  ContactMessageQuerySchema,
  CreateContactMessageBody,
} from "@dojo-portfolio/shared";
import { Controller } from "../../types/handler.types";

import * as contactService from "./contact.service";

export const getContactMessages: Controller = async (req, res, next) => {
  try {
    const data = contactService.getContactMessages(
      ContactMessageQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getContactMessageById: Controller = async (req, res, next) => {
  try {
    const message = contactService.getContactMessageById(
      req.params.contactMessageId as string,
    );

    res.status(200).json({ success: true, data: { message } });
  } catch (error) {
    next(error);
  }
};

export const createContactMessage: Controller = async (req, res, next) => {
  try {
    const message = contactService.createContactMessage(
      req.body as CreateContactMessageBody,
    );

    res.status(201).json({ success: true, data: { message } });
  } catch (error) {
    next(error);
  }
};

export const deleteContactMessage: Controller = async (req, res, next) => {
  try {
    const message = contactService.deleteContactMessage(
      req.params.contactMessageId as string,
    );

    res.status(200).json({ success: true, data: { message } });
  } catch (error) {
    next(error);
  }
};

export const readContactMessage: Controller = async (req, res, next) => {
  try {
    const message = contactService.readContactMessage(
      req.params.contactMessageId as string,
    );

    res.status(200).json({ success: true, data: { message } });
  } catch (error) {
    next(error);
  }
};
