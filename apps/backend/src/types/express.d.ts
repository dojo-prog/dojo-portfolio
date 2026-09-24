import { UserPublic } from "@dojo-portfolio/shared";

declare global {
  namespace Express {
    interface Request {
      user?: UserPublic;
    }
  }
}
