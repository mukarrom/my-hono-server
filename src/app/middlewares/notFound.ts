import { Context, Env } from "hono";
import { serveStatic } from "hono/bun";

export const notFound = serveStatic({
  onNotFound(path, c) {
    console.log(`${path} is not found on line ${c.req.path}`);
  },
});

export const notFoundMiddleware = (c: Context<Env, any, {}>) =>
  c.json(
    {
      success: false,
      message: "Not found",
      data: "Not found",
    },
    404
  );
