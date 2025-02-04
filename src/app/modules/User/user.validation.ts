import { z } from "zod";

const userValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be less than 50 characters long" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(50, { message: "Email must be less than 50 characters long" }),
  phone: z
    .string()
    .min(3, { message: "Phone must be at least 10 characters long" })
    .max(13, { message: "Phone must be less than 10 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be less than 50 characters long" }),
});

const createNewUserValidationSchema = z.object({
  body: userValidationSchema,
});

const updateUserValidationSchema = z.object({
  body: userValidationSchema,
});

export const UserValidations = {
  createNewUserValidationSchema,
  updateUserValidationSchema,
};
