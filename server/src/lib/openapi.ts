import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";

export const openApiPlugin = new Elysia().use(
  openapi({
    documentation: {
      info: {
        title: "Elysia API",
        version: "0.0.1",
      },
    },
  }),
);
