export const UserType = {
  INDIVIDUAL: "Individual",
  COMPANY: "Company",
} as const;

export interface IRegister {
  email: string;
  password1: string;
  password2: string;
  phone: string;
  user_type: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IToken {
  access: string | null;
  refresh: string | null;
}

export interface IUser {
  pk: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_type: string;
}
