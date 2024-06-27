import {
  ICompanyOnboarding,
  IIndividualOnboarding,
  SubmissionModeType,
} from "@/types";
import { StateCreator } from "zustand";

export interface IOnboardingSlice {
  onboardingMode: string;
  individualOnboarding: IIndividualOnboarding;
  setIndividualOnboarding: (value: Partial<IIndividualOnboarding>) => void;
  companyOnboarding: ICompanyOnboarding;
  setCompanyOnboarding: (value: Partial<ICompanyOnboarding>) => void;
  setOnboardingMode: (value: string) => void;
}

export const onboardingSlice: StateCreator<IOnboardingSlice> = (set) => ({
  onboardingMode: SubmissionModeType.MANUAL,
  individualOnboarding: {
    vtin: "",
    tin: "",
    tin_type: "",
    submission_mode: "",
    last_name: "",
    middle_name: "",
    first_name: "",
    title: "",
    marital_status: "",
    date_of_birth: "",
    place_of_birth: "",
    gender: "",
    house_number: null,
    street: "",
    phone_number_1: "",
    phone_number_2: "",
    email_address: "",
    occupation: "",
    basic_salary: null,
    gross_income: null,
    annual_tax_paid: null,
    annual_total_income: null,
    pension: null,
    nhis: null,
    nsitf: null,
    nhf: null,
    utitlity_allowance: null,
    arrears: null,
    life_assurance: null,
    thirteenth_month_salary: null,
    gratuity: null,
    medical_allowance: null,
    housing_allowance: null,
    transport_allowance: null,
    leave_allowance: null,
    one_off_allowance: null,
    consolidated_relief_allowance: null,
    first_time_filling: null,
    state_of_origin: "",
    state_of_residence: "",
    lga_of_residence: "",
    past_tax_filling: "",
  },
  companyOnboarding: {
    name: "",
    sector: "",
    city: "",
    address: "",
    has_cac: null,
    tin: "",
    submission_mode: "",
    first_time_filling: null,
    past_tax_filling: "",
  },
  setIndividualOnboarding: (value) =>
    set((s) => ({
      ...s,
      individualOnboarding: { ...s.individualOnboarding, ...value },
    })),
  setCompanyOnboarding: (value) =>
    set((s) => ({
      ...s,
      companyOnboarding: { ...s.companyOnboarding, ...value },
    })),
  setOnboardingMode: (value) => set({ onboardingMode: value }),
});
