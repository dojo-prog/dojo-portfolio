import { Pool, types } from "pg";
import { ENV } from "../../config/env";

types.setTypeParser(1082, (value) => value);

export const pool = new Pool(ENV.DATABASE);
