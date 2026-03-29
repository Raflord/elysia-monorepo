import { cors } from "@elysiajs/cors";
import { auth } from "@server/lib/auth";
import { Elysia } from "elysia";

const betterAuth = new Elysia({ name: "better-auth" })
  .mount("/auth", auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return status(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });

const app = new Elysia()
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(betterAuth)
  .get("/", () => {
    const data = {
      message: "Hello from API",
      success: true,
    };
    return data;
  })
  .get(
    "/user",
    ({ user }) => {
      return user;
    },
    {
      auth: true,
    },
  )
  .listen(process.env.PORT ?? 8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
