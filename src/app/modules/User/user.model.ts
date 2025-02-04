import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

// const userNameSchema = new Schema<IUserName>(
//   {
//     firstName: {
//       type: String,
//     },
//     middleName: {
//       type: String,
//     },
//     lastName: {
//       type: String,
//     },
//   },
//   {
//     _id: false,
//   }
// );

// const addressSchema = new Schema({
//   village: {
//     type: String,
//   },
//   post: {
//     type: String,
//   },
//   policeStation: {
//     type: String,
//   },
//   district: {
//     type: String,
//   },
// });

// const userSchema = new Schema<IUser>(
//   {
//     name: {
//       nameBD: { type: userNameSchema },
//       nameAr: { type: userNameSchema },
//       nameEn: { type: userNameSchema },
//     },
//     dateOfBirth: { type: Date },
//     address: {
//       presentAddress: addressSchema,
//       permanentAddress: addressSchema,
//     },
//     email: { type: String },
//     phone: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// export const UserModel = model<IUser>("User", userSchema);
export const UserModel = model<IUser>("User", userSchema);
