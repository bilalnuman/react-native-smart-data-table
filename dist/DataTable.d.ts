import React, { ReactNode } from 'react';
import { Column, DataTableStyles } from './types';
interface DataTableProps<Row extends {
    id: number;
}> {
    data: Row[];
    columns: Column[];
    isCheckBox?: boolean;
    searchAble?: boolean;
    columnsVisibility?: string[];
    renderCell?: (row: Row, column: Column) => ReactNode;
    sortIcon?: (dir: 'asc' | 'desc' | undefined) => ReactNode;
    onSelectionChange?: (selectedIds: number[]) => void;
    styles?: DataTableStyles;
    pagination?: boolean;
    page?: number;
    totalPages?: number;
    paginationVariant?: 'classic' | 'basic';
    onPageChange?: (page: number) => void;
}
declare const DataTable: <Row extends {
    id: number;
}>({ data, columns, isCheckBox, searchAble, columnsVisibility, renderCell, onSelectionChange, sortIcon, page, totalPages, pagination, paginationVariant, onPageChange, styles: s, }: DataTableProps<Row>) => React.JSX.Element;
export default DataTable;
