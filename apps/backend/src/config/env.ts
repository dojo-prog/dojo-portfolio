import "dotenv/config";

// =======================================
// HELPERS / CHECKERS
// =======================================

const getReqEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env ${name}`);
  }

  return value;
};

const getReqEnvNum = (name: string, defaultVal?: number) => {
  const raw = process.env[name];

  if (!raw) {
    if (!defaultVal) {
      throw new Error(`Missing required num env ${name}`);
    }

    return defaultVal;
  }

  const parsedVal = Number(raw);

  if (Number.isNaN(parsedVal)) {
    throw new Error(`Env ${name} must be a number`);
  }

  return parsedVal;
};

// =======================================
// ENV CONFIGURATION MODULE
// =======================================

const ENV = {
  NODE_ENV: getReqEnv("NODE_ENV"),
  PORT: getReqEnvNum("PORT"),
  BASE_URL: getReqEnv("BASE_URL"),
  CLIENT_URL: getReqEnv("CLIENT_URL"),

  DEV_CLIENT_URL: getReqEnv("DEV_CLIENT_URL"),
  DEV_ADMIN_CLIENT_URL: getReqEnv("DEV_ADMIN_CLIENT_URL"),

  DATABASE:
    process.env.NODE_ENV === "production"
      ? {
          connectionString: getReqEnv("DATABASE_URL"),
        }
      : {
          host: getReqEnv("DATABASE_HOST"),
          port: getReqEnvNum("DATABASE_PORT"),
          database: getReqEnv("DATABASE_NAME"),
          user: getReqEnv("DATABASE_USER"),
          password: getReqEnv("DATABASE_PASSWORD"),
        },

  ACCESS_TOKEN_SECRET: getReqEnv("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: getReqEnv("REFRESH_TOKEN_SECRET"),

  CLOUDINARY_CLOUD_NAME: getReqEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getReqEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getReqEnv("CLOUDINARY_API_SECRET"),
} as const;

export { ENV };
