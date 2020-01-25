export const DB_HOST = process.env.DB_HOST ?? "localhost";
export const DB_PORT = parseInt(process.env.DB_PORT) ?? 5432;
export const DB_USER = process.env.DB_USER ?? "postgres";
export const DB_PASS = process.env.DB_PASS ?? "postgres";
export const DB_NAME = process.env.DB_NAME ?? "postgres";
export const DB_SYNC = process.env.DB_SYNC === "true" ? true : false;
export const PORT = parseInt(process.env.PORT) ?? 3000;
