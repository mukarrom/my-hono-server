import { Context, Env } from "hono";
import { BlankInput } from "hono/types";
import sendResponse from "../../utils/sendResponse";
import { IUser } from "./user.interface";
import { UserServices } from "./user.service";

// Create new user Controller
const createNewUserController = async (c: Context<Env, "/", BlankInput>) => {
  // get data from body request
  const body: IUser = await c.req.json();

  // call user service to create new user
  const result = await UserServices.createNewUserService(body);
  return sendResponse(c, {
    statusCode: 200,
    success: true,
    message: "New user created successfully",
    data: result,
  });
};

// Get all users Controller
const getAllUsersController = async (c: Context<Env, "/", BlankInput>) => {
  const query = c.req.query();

  const result = await UserServices.getAllUsersService(query);

  return sendResponse(c, {
    statusCode: 200,
    success: true,
    message: "All user retrieved successfully",
    data: result,
  });
};

// Get single user by id Controller
const getSingleUserByIdController = async (
  c: Context<Env, "/", BlankInput>
) => {
  const { id } = c.req.param();
  const result = await UserServices.getSingleUserByIdService(id);
  return sendResponse(c, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
};

// Update user by id Controller
const updateUserByIdController = async (c: Context<Env, "/", BlankInput>) => {
  // user id
  const { id } = c.req.param();
  const updateData: IUser = await c.req.json();

  const result = await UserServices.updateUserByIdService(id, updateData);
  return sendResponse(c, {
    statusCode: 200,
    success: true,
    message: "User updated successfully",
    data: result,
  });
};

// Delete user by id Controller
const deleteUserByIdController = async (c: Context<Env, "/", BlankInput>) => {
  const { id } = c.req.param();
  const result = await UserServices.deleteUserByIdService(id);
  return sendResponse(c, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
};

export const UserControllers = {
  createNewUserController,
  getAllUsersController,
  getSingleUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
};
