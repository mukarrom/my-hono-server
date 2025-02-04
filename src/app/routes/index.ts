import { Hono } from "hono";
import { TModuleRoute } from "../interfaces";
import { UserRoutes } from "../modules/User/user.route";

const router = new Hono();

const moduleRoutes: TModuleRoute[] = [
  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.route(route.path, route.route));

export default router;
