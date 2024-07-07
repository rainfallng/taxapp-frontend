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

export type IAccommodation = {
  id: 1;
  icode: "RAN-00000001";
  created: "2024-07-07T12:33:48.863639+01:00";
  modified: "2024-07-07T12:33:48.863668+01:00";
  is_active: true;
  accommodation_type: "Apartment";
  ownership_type: "TENANT";
  owner_name: "Eze";
  owner_address: "5 Balogun street";
  owner_tax_payer_number: "12345678";
  rent_paid: "2000.00";
  rent_paid_by_employer: "1000.00";
  start_date: "2024-07-01";
  end_date: "2024-07-08";
  created_by: "f6c9f65c-cd95-4350-940e-6bbd25f11694";
  modified_by: null;
  individual_return: 3;
};
