import { Hono } from "hono";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { UserValidations } from "./user.validation";

const router = new Hono();

router
  .post(
    "/",
    validateRequest(UserValidations.createNewUserValidationSchema),
    UserControllers.createNewUserController
  )
  .get("/", UserControllers.getAllUsersController)
  .get("/:id", UserControllers.getSingleUserByIdController)
  .patch("/:id", validateRequest(UserValidations.updateUserValidationSchema), UserControllers.updateUserByIdController)
  .delete("/:id", UserControllers.deleteUserByIdController);

export const UserRoutes = router;
