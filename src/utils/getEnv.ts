type ConfigKey = "MONGODB_USERNAME" | "MONGODB_PASSWORD" | "MONGODB_DB_NAME" | "JWT_SECRET";

export function getEnv(key: ConfigKey): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return value;
}
