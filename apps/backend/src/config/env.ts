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
  ADMIN_CLIENT_URL: getReqEnv("ADMIN_CLIENT_URL"),

  // DATABASE_HOST: getReqEnv("DATABASE_HOST"),
  // DATABASE_PORT: getReqEnvNum("DATABASE_PORT"),
  // DATABASE_NAME: getReqEnv("DATABASE_NAME"),
  // DATABASE_USER: getReqEnv("DATABASE_USER"),
  // DATABASE_PASSWORD: getReqEnv("DATABASE_PASSWORD"),

  DATABASE_URL: getReqEnv("DATABASE_URL"),

  ACCESS_TOKEN_SECRET: getReqEnv("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: getReqEnv("REFRESH_TOKEN_SECRET"),

  CLOUDINARY_CLOUD_NAME: getReqEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getReqEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getReqEnv("CLOUDINARY_API_SECRET"),
} as const;

export { ENV };
