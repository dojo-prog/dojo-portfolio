import { UserPrivateSchema, UserPublicSchema } from "@dojo-portfolio/shared";

export const USER_PUBLIC_COLUMNS = Object.keys(UserPublicSchema.shape);

export const USER_PUBLIC_PROJECTION = USER_PUBLIC_COLUMNS.join(", ");

export const USER_PRIVATE_COLUMNS = Object.keys(UserPrivateSchema.shape);

export const USER_PRIVATE_PROJECTION = USER_PRIVATE_COLUMNS.join(", ");
