export interface IIndividualOnboardingInput {
  id_type: string;
  id_number: string;
  date_of_birth?: string;
}

export interface IPersonalInfo {
  title: string;
  marital_status: string;
  gender: string;
  state_of_origin: string;
  place_of_birth: string;
  phone_number_1: string;
}

export interface IVerifyCAC {
  rc_number: string;
  company_name: string;
}

export interface ICompanyInfo {
  state: string;
  lga: string;
  street_number: number;
  street_name: string;
  lcda: string;
  tax_station: string;
  business_type: string;
  place_of_business: string;
}

export interface IIndividualProfile {
  first_name: string;
  last_name: string;
  middle_name: string;
  title: string;
  marital_status: string;
  employment_status: string;
  nationality: string;
  date_of_birth: string;
  gender: string;
  state_of_origin: string | number;
  lga: null | number;
  business_type: string;
  lcda: string;
  occupation: string;
  phone_number_1: string;
  email_address: string;
  street_number: number | null;
  street_name: string;
  state: null | number;
}

export interface IIndividualAnnualIncome {
  other_incomes?: {
    name: string;
    details?: string;
    value: string;
  }[];
  salary: string;
  commission: string;
  trade_income: string;
  allowance: string;
  pension: string;
  annuity: string;
  gratuities: string;
  foreign_income: string;
  dividend: string;
  interest: string;
  rent: string;
  statement_of_income: string;
  year_in_view?: number;
}

export interface IIndividualReturn {
  year_in_view: number | string;
  tin: string;
}

export interface IIndividualAnnualAccomodationInput {
  accommodation_type: string;
  ownership_type: string;
  owner_name: string;
  owner_address: string;
  owner_tax_payer_number: string;
  rent_paid: string;
  rent_paid_by_employer: string;
  start_date: string;
  end_date: string;
}

export interface IConsultantSignUp {
  tax_id: string;
  credential: FormData;
}

export interface IConsultantRequestForm extends IConsultantSignUp {
  id_type: string;
  id_number: string;
  otp: string;
  email: string;
}

export interface IConsultantVerifyIdentity {
  id_type: string;
  id_number: string;
  tax_office: null;
  first_name: string;
  last_name: string;
  phone_number_1: string;
}
