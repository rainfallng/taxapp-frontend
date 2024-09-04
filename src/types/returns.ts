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
  month: number;
  year: number;
  created_by: string;
  modified_by: string;
  company_profile: number;
  bill: Bill;
  amount: string;
  reference: string;
  number_of_employees: number;
  month_name: string;
}

export type CompanyReturnsList = {
  count: number;
  page: number;
  pages: number;
  results: ICompanyReturn[];
};

export type AddCompanyStaffReturn = {
  tin: string;
  name: string;
  designation: string;
  basic: number | null;
  housing: number | null;
  transport: number | null;
  others: number | null;
  bonus: number | null;
  state_of_residence: number | null;
};
