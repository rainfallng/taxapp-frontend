import { payeSchemaObject } from "@/lib/schemas/returns/company/paye";
import * as yup from "yup";
import {
  ProjectionReturnType,
  ScheduleReturnTaxType,
  WitholdingTaxType,
} from "./form";

export type IAnnualReturnStage = "id" | "income" | "accomodation";

export type IndividualReturn = {
  id: number;
  icode: string;
  income: {
    id: number;
    icode: string;
    other_incomes: [
      {
        id: number;
        icode: string;
        created: string;
        modified: string;
        is_active: boolean;
        name: string;
        details: string;
        value: string;
        created_by: string;
        modified_by: string;
        income: number;
      }
    ];
    created: string;
    modified: string;
    is_active: boolean;
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
    created_by: string;
    modified_by: string;
    individual_return: number;
  };
  accommodation: {
    id: number;
    icode: string;
    created: string;
    modified: string;
    is_active: boolean;
    accommodation_type: string;
    ownership_type: string;
    owner_name: string;
    owner_address: string;
    owner_tax_payer_number: string;
    rent_paid: string;
    rent_paid_by_employer: string;
    start_date: string;
    end_date: string;
    created_by: string;
    modified_by: string;
    individual_return: number;
  };
  created: string;
  modified: string;
  is_active: boolean;
  return_type: string;
  year_in_view: number;
  reference: string;
  status: string;
  created_by: string;
  modified_by: string;
  user: string;
};

export type IndividualReturnsList = {
  count: number;
  page: number;
  pages: number;
  results: IndividualReturn[];
};

export type Bill = {
  id: number;
  icode: string;
  created: string;
  modified: string;
  is_active: boolean;
  name: string;
  details: string;
  amount: string;
  description: string;
  status: string;
  created_by: string;
  modified_by: string;
  tax_collector: number;
  revenue: number;
  reference: string;
  charge: string;
  tax_collector_name: string;
};

export type BillList = {
  count: number;
  page: number;
  pages: number;
  results: Bill[];
};

export interface ICompanyReturn {
  id: number;
  icode: string;
  created: string;
  modified: string;
  is_active: boolean;
  return_type: string;
  month: string;
  year: number;
  created_by: string;
  modified_by: string;
  company_profile: number;
  amount: string;
  reference: string | null;
  status: string;
}

export type CompanyReturnsList = {
  count: number;
  page: number;
  pages: number;
  results: ICompanyReturn[];
};

export type AddCompanyStaffReturn = yup.InferType<typeof payeSchemaObject>;

export type ReturnGraph = {
  month_name: string;
  amount: number;
};

export type YearParam = { year: number };

export type MonthParam = { month: string };

export type YearOrMonthParam = YearParam | MonthParam;

export type ReturnStat = {
  count: number;
  amount: number;
};

export type CompanyReturn = {
  id: number;
  icode: string;
  amount: number | null;
  created: string;
  modified: string;
  is_active: boolean;
  return_type: string;
  month: string | null;
  year: number;
  reference: string | null;
  status: string;
  created_by: string;
  modified_by: string | null;
  company_profile: number;
};

export type CompanyReturnSchema = {
  company_return: CompanyReturn;
  id: number;
  icode: string;
  created_by: string;
  modified_by: string;
};

export type AnnualReturnData = {
  id: number;
  icode: string;
  company_return: CompanyReturn;
  tax_payer_id: string;
  created: string;
  modified: string;
  is_active: boolean;
  surname: string;
  first_name: string;
  middle_name: string;
  designation: string;
  gross_income: string;
  staff_phone_number: string;
  staff_email_address: string;
  number_of_months: number;
  development_levy: string;
  chargeable_income: string;
  annual_tax_paid: string;
  created_by: string;
  modified_by: null;
  nationality: number;
};

export type AnnualReturnList = {
  count: number;
  page: number;
  pages: number;
  results: AnnualReturnData[];
};

export type ProjectionReturnList = {
  count: number;
  page: number;
  pages: number;
  results: (CompanyReturnSchema & ProjectionReturnType)[];
};

export type ScheduleReturnList = {
  count: number;
  page: number;
  pages: number;
  results: (CompanyReturnSchema & ScheduleReturnTaxType)[];
};

export type WitholdingTaxList = {
  count: number;
  page: number;
  pages: number;
  results: (CompanyReturnSchema & WitholdingTaxType)[];
};

export type PayeSummary = {
  success: boolean;
  data: {
    month: string;
    email_address: string | null;
    amount: number;
    company_name: string;
    tax_payer_id: string | null;
    created_at: string;
    phone_number: string |null;
  };
};
