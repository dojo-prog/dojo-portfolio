import { UserPublicSchema } from "@dojo-portfolio/shared";

export const USER_PUBLIC_COLUMNS = Object.keys(UserPublicSchema.shape);

export const USER_PUBLIC_PROJECTION = USER_PUBLIC_COLUMNS.join(", ");
