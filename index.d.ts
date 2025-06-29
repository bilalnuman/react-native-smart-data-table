import { ReactNode } from 'react';
import { Column, DataTableProps, PaginationProps } from './src/types';

declare function DataTable<Row extends { id: number }>(props: DataTableProps<Row>): ReactNode;
declare const Pagination: React.FC<PaginationProps>;

export default DataTable;
export type { Column, PaginationProps, DataTableProps };
export { Pagination };
