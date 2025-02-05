import AppError from '../../errors/AppError';
import { TAuth, TAuthLogin } from './auth.interface';
import { AuthModel } from './auth.model';
import { comparePassword } from './auth.utils';

const signUpService = async (payload: TAuth) => {
	const result = await AuthModel.create(payload);
	return result;
};

const loginService = async (payload: TAuthLogin) => {
	const auth = await AuthModel.findOne({ email: payload.email });
	if (!auth) {
		throw new AppError(404, 'User does not exist');
	}

	const isPasswordCorrect = await comparePassword(
		payload.password,
		auth.password
	);

	if (!isPasswordCorrect) {
		throw new AppError(400, 'Password is incorrect');
	}

	return auth;
};
