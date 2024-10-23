export interface IConsultant {
  id: number;
  icode: string;
  created: string;
  modified: string;
  is_active: boolean;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string;
  tax_id: string | null;
  status: string;
  credential: string | null;
  created_by: string;
  modified_by: string | null;
  user: string;
  tax_office: null;
  id_number: string;
  id_type: string;
}
