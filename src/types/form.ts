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
  place_of_birth: string;
  gender: string;
  state_of_origin: string;
  lga_of_residence: string;
  business_type: string;
  lcda: string;
  occupation: string;
  phone_number_1: string;
  email_address: string;
  house_number: number | null;
  street: string;
}
