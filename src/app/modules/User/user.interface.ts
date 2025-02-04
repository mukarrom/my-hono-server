// export interface IUserName {
//   firstName: string;
//   middleName?: string;
//   lastName?: string;
// }

// export interface IAddress {
//   village: string;
//   post: string;
//   policeStation: string;
//   district: string;
// }

// export interface IUser {
//   name: {
//     nameBD: IUserName;
//     nameAr?: IUserName;
//     nameEn?: IUserName;
//   };
//   dateOfBirth: Date;
//   address?: {
//     presentAddress?: IAddress;
//     permanentAddress?: IAddress;
//   };
//   email?: string;
//   phone?: string;
// }

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}
