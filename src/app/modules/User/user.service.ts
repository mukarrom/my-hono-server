import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

// Create new user service
const createNewUserService = async (payload: IUser) => {
  const result = await UserModel.create(payload);
  return result;
};

// Get all users service
const getAllUsersService = async (query: Record<string, unknown>) => {
  // const { priority } = query;
  // const queries: Record<string, unknown> = {};
  // if (priority) {
  //   queries.priority = priority;
  // }
  const result = await UserModel.find(query);
  return result;
};

// Get single user by id service
const getSingleUserByIdService = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

// Update user by id service
const updateUserByIdService = async (id: string, payload: IUser) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// Delete user by id service
const deleteUserByIdService = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  createNewUserService,
  getAllUsersService,
  getSingleUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
};
