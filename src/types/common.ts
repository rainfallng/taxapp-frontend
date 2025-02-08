export interface IPaginatedResponse<T = null> {
  count: number;
  page: number;
  pages: number;
  results: Array<T>;
}

export type Nationality = {
  id: number;
  icode: string;
  created: string;
  modified: string;
  is_active: boolean;
  name: string;
  details: string;
  created_by: string;
  modified_by: string;
};
