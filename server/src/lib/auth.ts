import { db } from "@server/database/database";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    db: db,
    type: "postgres",
  },
  basePath: "/api",
  baseURL: "http://localhost:3001/",
  emailAndPassword: { enabled: true },
});
