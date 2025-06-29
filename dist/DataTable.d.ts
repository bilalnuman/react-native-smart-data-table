import React from 'react';
import { DataTableProps } from './types';
declare const DataTable: <Row extends {
    id: number;
}>({ data, columns, isCheckBox, searchAble, columnsVisibility, renderCell, onSelectionChange, sortIcon, page, totalPages, pagination, paginationVariant, onPageChange, styles: s, }: DataTableProps<Row>) => React.JSX.Element;
export default DataTable;
