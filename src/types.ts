
import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type Align = 'left' | 'center' | 'right';

export interface Column {
    key: string;
    title: string;
    sortable?: boolean;
    align?: Align;
    width?: number,
    numberOfLines?: number,
    scrollable?: { h?: boolean; v?: boolean };
}

export interface DataTableStyles {
    container?: ViewStyle;
    searchInput?: ViewStyle;
    header?: ViewStyle;
    headerCell?: ViewStyle;
    headerText?: TextStyle;
    row?: ViewStyle;
    rowEven?: ViewStyle;
    rowOdd?: ViewStyle;
    cell?: ViewStyle;
    cellText?: TextStyle;
    checkbox?: ViewStyle;
    noData?: TextStyle;
    checkedCheckbox?: ViewStyle | TextStyle;
}

export interface DataTableProps<Row extends { id: number }> {
    data: Row[];
    columns: Column[];
    isCheckBox?: boolean;
    searchAble?: boolean;
    columnsVisibility?: string[];
    renderCell?: (row: Row, column: Column) => ReactNode;
    sortIcon?: (dir: 'asc' | 'desc' | undefined) => ReactNode;
    onSelectionChange?: (selectedIds: number[]) => void;
    styles?: DataTableStyles;
    pagination?: boolean,
    page?: number,
    totalPages?: number,
    paginationVariant?: "classic" | "basic",
    onPageChange?: (page: number) => void
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: 'basic' | 'classic';
    style?: ViewStyle;
}
