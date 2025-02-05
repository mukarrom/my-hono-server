export type TUserRole = 'user' | 'admin';

export type TAuth = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone: string;
};

export type TAuthLogin = {
	email: string;
	password: string;
};

export type TAuthResponse = {
	accessToken: string;
	refreshToken: string;
};
