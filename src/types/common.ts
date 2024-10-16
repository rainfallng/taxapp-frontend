export interface IPaginatedResponse<T = null> {
  count: number;
  page: number;
  pages: number;
  results: Array<T>;
}
