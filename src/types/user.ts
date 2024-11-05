export const UserType = {
  INDIVIDUAL: "Individual",
  COMPANY: "Company",
  ADMIN: "Admin",
  TAX_CONSULTANT: "Tax Consultant",
} as const;

export const MaritalStatusType = {
  SINGLE: "Single",
  MARRIED: "Married",
} as const;

export const BusinessType = {
  LARGE: "Large",
  SMALL: "Small",
} as const;

export const TitleType = {
  Mr: "Mr",
  Ms: "Mrs",
} as const;

export const GenderType = {
  MALE: "Male",
  FEMALE: "Female",
} as const;

export const SubmissionModeType = {
  MANUAL: "MANUAL",
  TIN: "TIN",
  "TIN-MANUAL": "TIN-MANUAL",
} as const;

export const IndentificationType = {
  NIN: "NIN",
  BVN: "BVN",
} as const;

export const EmploymentStatusType = {
  EMPLOYED: "Employed",
  UNEMPLOYED: "Unemployed",
  SELFEMPLOYED: "Self Employed",
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

export interface IResetPassword {
  token: string;
  password1: string;
  password2: string;
}

export interface IToken {
  access: string | null;
  refresh: string | null;
}

export type IndividualProfile = {
  id: number;
  icode: string;
  created: string;
  modified: string;
  is_active: boolean;
  tin: string;
  lasrra: string;
  title: string;
  marital_status: string;
  place_of_birth: string;
  date_of_birth: string;
  gender: string;
  house_number: number;
  street: string;
  city: string;
  lcda: string;
  phone_number_1: string;
  phone_number_2: string;
  email_address: string;
  residential_address: string;
  is_public_servant: boolean;
  business_type: string;
  employment_status: string;
  occupation: string;
  created_by: string;
  modified_by: string;
  user: string;
  state_of_origin: string;
  state_of_residence: string;
  lga_of_residence: string;
};

export type CompanyProfile = {
  id: number;
  icode: string;
  created: string;
  modified: string;
  is_active: boolean;
  tin: string;
  lasrra: string;
  title: string;
  marital_status: string;
  place_of_birth: string;
  gender: string;
  house_number: number;
  street: string;
  city: string;
  lcda: string;
  phone_number_1: string;
  phone_number_2: string;
  email_address: string;
  residential_address: string;
  is_public_servant: boolean;
  business_type: string;
  employment_status: string;
  occupation: string;
  created_by: string;
  modified_by: string;
  user: string;
  state_of_origin: string;
  state_of_residence: string;
  lga_of_residence: string;
};

export interface IUser {
  id: string;
  icode: string;
  profile: IndividualProfile | null;
  company_profile: CompanyProfile | null;
  created: string;
  modified: string;
  last_login: string;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  email: string;
  phone: string;
  other_name: string;
  phone_verified: boolean;
  identity_verified: boolean;
  tin_verified: boolean;
  cac_verified: boolean;
  user_type: string;
  created_by: string;
  modified_by: string;
  groups: [];
  user_permissions: [];
}

export interface IIndividualOnboarding {
  tin: string;
  tin_type: string;
  submission_mode: string;
  last_name: string;
  middle_name: string;
  first_name: string;
  title: string;
  marital_status: string;
  date_of_birth: string;
  place_of_birth: string;
  gender: string;
  house_number: number | null;
  street: string;
  phone_number_1: string;
  phone_number_2: string;
  email_address: string;
  occupation: string;
  basic_salary: number | null;
  gross_income: number | null;
  annual_tax_paid: number | null;
  annual_total_income: number | null;
  pension: number | null;
  nhis: number | null;
  nsitf: number | null;
  nhf: number | null;
  utitlity_allowance: number | null;
  arrears: number | null;
  life_assurance: number | null;
  thirteenth_month_salary: number | null;
  gratuity: number | null;
  medical_allowance: number | null;
  housing_allowance: number | null;
  transport_allowance: number | null;
  leave_allowance: number | null;
  one_off_allowance: number | null;
  consolidated_relief_allowance: number | null;
  first_time_filling: boolean | null;
  state_of_origin: string | number;
  state_of_residence: string | number;
  lga_of_residence: string | number;
  past_tax_filling: string;
  vtin: string | null;
}

export interface ICompanyOnboarding {
  name: string;
  sector: string;
  city: string | number;
  address: string;
  has_cac: boolean | null;
  tin: string;
  submission_mode: string;
  first_time_filling: boolean | null;
  past_tax_filling: string;
}

export interface IConsultantOnboarding {
  id_type: string;
  id_number: string;
  otp: string;
  tax_office: null;
  first_name: string;
  last_name: string;
  phone_number_1: string;
}

export interface IState {
  id: number;
  icode: string;
  created: string;
  modified: string;
  is_active: true;
  name: string;
  details: string;
  created_by: string;
  modified_by: string | null;
}

export interface ILGAs {
  id: number;
  icode: string;
  created: string;
  modified: string;
  is_active: boolean;
  name: string;
  details: string;
  created_by: string;
  modified_by: number | null;
  state: number;
}
