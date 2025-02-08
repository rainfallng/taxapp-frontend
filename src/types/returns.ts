import { payeSchemaObject } from "@/lib/schemas/returns/company/paye";
import * as yup from "yup";
import {
  AnnualReturnType,
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
        is_active: true;
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
    is_active: true;
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
    is_active: true;
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
  is_active: true;
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
  is_active: true;
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
  is_submitted: boolean;
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
  amount: string;
  created: string;
  modified: string;
  is_active: boolean;
  return_type: string;
  month: string;
  year: number;
  is_submitted: boolean;
  created_by: string;
  modified_by: string;
  company_profile: number;
};

export type CompanyReturnSchema = {
  company_return: CompanyReturn;
  id: number;
  icode: string;
  created_by: string;
  modified_by: string;
};

export type AnnualReturnList = {
  count: number;
  page: number;
  pages: number;
  results: (CompanyReturnSchema & AnnualReturnType)[];
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
