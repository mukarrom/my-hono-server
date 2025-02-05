import { model, Schema } from 'mongoose';
import { TAuth } from './auth.interface';
import * as bcrypt from 'bcrypt';
import config from '../../config';

const authSchema = new Schema<TAuth>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		phone: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

// encrypt password before saving
authSchema.pre('save', async function (next) {
	this.email = this.email.toLowerCase();
	// encrypt the password
	this.password = await bcrypt.hash(
		this.password,
		Number(config.bcrypt_salt_rounds)
	);
	next();
});

// check is user exists
authSchema.statics.isEmailTaken = async function (email: string) {
	return await this.findOne({ email }).select('+password');
};

// compare password
authSchema.methods.isPasswordMatched = async function (
	givenPassword: string
): Promise<boolean> {
	return await bcrypt.compare(givenPassword, this.password);
};

export const AuthModel = model<TAuth>('Auth', authSchema);
