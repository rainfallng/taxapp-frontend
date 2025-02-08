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
  created: string;
  modified: string;
  is_active: true;
  return_type: string;
  year_in_view: number;
  created_by: string;
  modified_by: string;
  bill: null;
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
