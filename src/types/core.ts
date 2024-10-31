import type { ResponseInfo } from "./store";

export interface DataElement {
  name: string;
  y: number;
  custom: {
    films: string[];
  };
}

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
  info: ResponseInfo;
}

export type Order = "asc" | "desc";
export interface Setting<T extends object> {
  column: string;
  key: keyof T;
  render: (row: T) => string | number;
  order?: Order;
}

export interface DataTableProps<T extends object> {
  settings: Setting<T>[];
  rows: T[];
  info: ResponseInfo;
  page: number;
  rowsPerPage: number;
  search?: string;
  multipleSelectOptions?: string[];
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newPage: number) => void;
  onSearch?: (searchValue: string) => void;
  onMultipleSelectChange?: (val: string[]) => void;
  onSortBy?: (direction: Order, key: keyof T) => void;
  onRowClick?: (row: T) => void;
}

export interface ExcelData {
  Name: string;
  "Number of films": number;
  Films: string;
  Percentage: string;
}
