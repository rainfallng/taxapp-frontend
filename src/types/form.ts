export interface IIndividualOnboarding {
  id_type: string;
  id_number: string;
  date_of_birth: string;
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
  house_number: number;
  street: string;
  lcda: string;
  tax_station: string;
  business_type: string;
  place_of_business: string;
}
