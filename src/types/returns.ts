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
};

export type BillList = {
  count: number;
  page: number;
  pages: number;
  results: Bill[];
};
