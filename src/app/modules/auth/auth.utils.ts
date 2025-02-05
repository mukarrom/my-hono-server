import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'; // Use named import

// Define the type for user roles if not already defined
type TUserRole = 'admin' | 'user' | 'guest'; // Example roles

export const generateJwtToken = (
	payload: { email: string; role: TUserRole },
	jwtAccessSecret: string,
	expiresIn: string
): string => {
	const options: jwt.SignOptions = {
		expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
	}; // Options for signing the token
	return jwt.sign(payload, jwtAccessSecret, options);
};

export const verifyJwtToken = (token: string, jwtAccessSecret: string) => {
	return jwt.verify(token, jwtAccessSecret);
};

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
	givenPassword: string,
	savedPassword: string
) => {
	return await bcrypt.compare(givenPassword, savedPassword);
};
