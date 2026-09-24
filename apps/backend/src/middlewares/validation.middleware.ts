import { Middleware } from "../types/handler.types";
import { ZodTypeAny } from "zod";
import { AppError } from "../utils/errors/AppError";

interface ValidationSchema {
  params?: ZodTypeAny;
  query?: ZodTypeAny;
  body?: ZodTypeAny;
}

// =======================================
// Schema Validator
// =======================================

const validateSchema = (schema: ZodTypeAny, data: Record<string, unknown>) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    const firstError = result.error.issues[0];

    throw new AppError(400, firstError.message, fieldErrors);
  }

  return result.data;
};

// =======================================
// Validation Handler
// =======================================

export const validate = (schema: ValidationSchema): Middleware => {
  return (req, res, next) => {
    // Params Validation
    if (schema.params) {
      req.params = validateSchema(
        schema.params,
        req.params,
      ) as typeof req.params;
    }

    // Query Validation
    if (schema.query) {
      Object.assign(req.query, validateSchema(schema.query, req.query));
    }

    // Body Validation
    if (schema.body) {
      req.body = validateSchema(schema.body, req.body);
    }

    next();
  };
};
