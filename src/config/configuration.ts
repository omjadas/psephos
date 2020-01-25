interface Config {
  port: number,
  db: {
    host: string,
    port: number,
    user: string,
    pass: string,
    name: string,
    sync: boolean,
  },
}

export default (): Config => ({
  port: parseInt(process.env.PORT) ?? 3000,
  db: {
    host: process.env.DB_HOST ?? "localhost",
    port: parseInt(process.env.DB_PORT) ?? 5432,
    user: process.env.DB_USER ?? "postgres",
    pass: process.env.DB_PASS ?? "postgres",
    name: process.env.DB_NAME ?? "postgres",
    sync: process.env.DB_SYNC === "true" ? true : false,
  },
});
