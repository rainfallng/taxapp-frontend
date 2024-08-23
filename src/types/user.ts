export const UserType = {
  INDIVIDUAL: "Individual",
  COMPANY: "Company",
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

export interface IToken {
  access: string | null;
  refresh: string | null;
}

export interface ICompanyProfile {
  id: number;
  icode: string;
  company_verification: {
    rc_number: string;
  };
  created: string;
  modified: string;
  is_active: boolean;
  tin: string | null;
  tax_payer_number: string | null;
  vtin: string | null;
  submission_mode: typeof SubmissionModeType;
  completion_status: string;
  tax_station: string | null;
  first_time_filling: string | null;
  past_tax_filling: string | null;
  name: string;
  email: string | null;
  business_type: string | null;
  phone_number: string | null;
  number_of_employees: string | null;
  number_of_directors: string | null;
  place_of_business: string;
  street_number: string | null;
  street_name: string | null;
  city: string;
  lcda: string | null;
  created_by: string | null;
  modified_by: string | null;
  state: string | null;
  lga: string | null;
}

export interface ITINProfile {
  id: number;
  age: number;
  nationality: string;
  lcda: string;
  employment_status: typeof EmploymentStatusType;
  icode: string;
  created: string;
  modified: string;
  is_active: boolean;
  tin: string;
  vtin: string;
  tin_type: typeof UserType;
  submission_mode: typeof SubmissionModeType;
  completion_status: string;
  last_name: string;
  middle_name: string;
  first_name: string;
  title: string;
  marital_status: string;
  date_of_birth: string;
  place_of_birth: string;
  gender: string;
  house_number: string;
  street: string;
  phone_number_1: string;
  phone_number_2: string;
  email_address: string;
  occupation: string;
  basic_salary: string;
  gross_income: string;
  annual_tax_paid: string;
  annual_total_income: string;
  pension: string;
  nhis: string;
  nsitf: string;
  nhf: string;
  utitlity_allowance: string;
  arrears: string;
  life_assurance: string;
  thirteenth_month_salary: string;
  gratuity: string;
  medical_allowance: string;
  housing_allowance: string;
  transport_allowance: string;
  leave_allowance: string;
  one_off_allowance: string;
  consolidated_relief_allowance: string;
  first_time_filling: string;
  past_tax_filling: string;
  created_by: string;
  modified_by: string;
  state_of_origin: string;
  state_of_residence: string;
  lga_of_residence: string;
  verification: {
    id_type: typeof IndentificationType;
    id_number: string;
    tax_office: string | null;
  };
}

export interface IUser {
  pk: string;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_type: string;
  tin_profile: ITINProfile | ICompanyProfile | null;
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
