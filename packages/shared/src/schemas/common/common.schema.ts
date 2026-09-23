import { z } from "zod";

export const UUIDSchema = z
  .string()
  .min(1, { message: "UUID is required" })
  .uuid({ message: "Invalid UUID format" });

export const IsoDateSchema = z.iso.date({
  message: "Invalid ISO date format",
});

export const IsoDatetimeSchema = z.iso.datetime({
  message: "Invalid ISO datetime format",
});

export const SlugSchema = z
  .string()
  .min(1, { message: "Error: Failed to generate slug" })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Invalid slug format" });

export const RequiredShortDescriptionSchema = z
  .string()
  .min(1, { message: "Short description is required" })
  .max(500, { message: "Short description cannot exceed 500 characters" });

export const RequiredDescriptionSchema = z
  .string()
  .min(1, { message: "Description is required" })
  .max(2000, { message: "Description cannot exceed 2000 characters" });

export const UrlSchema = z.url({ message: "Invalid URL format" });

export const GithubUrlSchema = UrlSchema.refine(
  (url) => new URL(url).hostname === "github.com",
  {
    message: "URL must be a Github Repo URL",
  },
);

export const NonNegativeIntSchema = z.coerce
  .number()
  .int({ message: "Number must be a whole number" })
  .nonnegative({ message: "Number must not be less than 0" });

export const PaginationQuerySchema = z.object({
  page: z.coerce
    .number()
    .min(1, { message: "Page cannot be less than 1" })
    .int({ message: "Page must be a whole number" }),

  limit: z.coerce
    .number()
    .nonnegative({ message: "Limit cannot be less than 0" })
    .int({ message: "Limit must be a whole number" }),
});

export const SearchQuerySchema = z.string().optional();

export const ImagePublicId = z.string();
