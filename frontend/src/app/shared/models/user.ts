export interface IUserRegister {
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
}

export interface IUserLogin {
  name: string;
  password: string;
}

export interface IUserLogged {
  email: string;
  imagePath: string;
  isAdmin: boolean;
  name: string;
  midiaIds: string[];
}

export interface IUserProfile {
  email: string;
  imagePath: string;
  name: string;
  password: string;
  userId: string;
}

export interface IUserRecover {
  code: number;
  confirmNewPassword: string;
  id: string;
  newPassword: string;
}
