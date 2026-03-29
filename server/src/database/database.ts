import type { Database } from "@server/database/databaseSchema";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

if (
  !process.env.DB_DATABASE ||
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_PORT
) {
  console.log("Database variables not available; stopping the server.");
  process.exit(1);
}

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: {
      rejectUnauthorized: false,
    },
    max: 5,
    idleTimeoutMillis: 30000, // close idle clients after 30 second
    connectionTimeoutMillis: 10000, // return an error after 10 second if connection could not be established
    maxUses: 5000, // close (and replace) a connection after it has been used 7500 times
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
