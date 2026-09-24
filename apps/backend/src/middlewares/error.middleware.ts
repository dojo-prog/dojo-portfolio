import { ErrorRequestHandler } from "express";
import { ENV } from "../config/env";
import { AppError } from "../utils/errors/AppError";
import { PostgresError } from "../types/error.types";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const isProduction = ENV.NODE_ENV === "production";

  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: Record<string, unknown> | null = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else {
    const pgError = err as PostgresError;

    // Uniqueness Error
    if (pgError.code === "23505") {
      statusCode = 409;

      switch (pgError.constraint) {
        case "user_email_unique":
          message = "A user with this email already exists.";
          break;

        case "project_title_unique":
          message = "A project with this title already exists.";
          break;

        case "project_slug_unique":
          message = "A project with this slug already exists.";
          break;

        case "skill_name_unique":
          message = "A skill with this name already exists.";
          break;

        case "experience_company_position_start_data_unique":
          message = "This experience record already exists.";
          break;

        default:
          message =
            "A record with these values already exists. Please reload the page.";
      }

      // Check Error
    } else if (pgError.code === "23514") {
      statusCode = 400;

      switch (pgError.constraint) {
        case "project_status_valid":
          message = "Invalid project status.";
          break;

        case "skill_category_valid":
          message = "Invalid skill category.";
          break;

        default:
          message = "The provided data violates a database rule";
      }

      // Internal Server Error
    } else if (!isProduction && err instanceof Error) {
      message = err.message;
    }
  }

  if (!isProduction && statusCode >= 500) {
    console.error(err);
  }

  const response: Record<string, unknown> = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  if (!isProduction) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
