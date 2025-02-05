import { z } from 'zod';

const authValidationSchema = z.object({
	firstName: z.string({
		required_error: 'First name is required',
		invalid_type_error: 'First name must be a string',
	}),
	lastName: z.string({
		invalid_type_error: 'Last name must be a string',
	}),
	email: z
		.string()
		.email({ message: 'Invalid email address' })
		.min(3, { message: 'Email must be at least 3 characters long' })
		.max(50, { message: 'Email must be less than 50 characters long' }),
	phone: z.string().optional(),
	password: z
		.string({
			required_error: 'Password is required',
			invalid_type_error: 'Password must be a string',
		})
		.min(6, { message: 'Password must be at least 6 characters long' })
		.max(50, { message: 'Password must be less than 50 characters long' }),
});

const createNewUserValidationSchema = z.object({
	body: authValidationSchema,
});

const loginUserValidationSchema = z.object({
	body: z.object({
		email: z
			.string()
			.email({ message: 'Invalid email address' })
			.min(3, { message: 'Email must be at least 3 characters long' })
			.max(50, { message: 'Email must be less than 50 characters long' }),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long' }),
	}),
});

export const AuthValidations = {
	createNewUserValidationSchema,
	loginUserValidationSchema,
};
