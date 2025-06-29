import React, { useState, ReactNode, useMemo } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import Pagination from './Pagination';

type Align = 'left' | 'center' | 'right';

export interface Column {
    key: string;
    title: string;
    sortable?: boolean;
    align?: Align;
    width?: number,
    numberOfLines?: number
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

interface DataTableProps<Row> {
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
const defaultSortIcon = (dir: 'asc' | 'desc' | undefined) => (
    <Text style={{ marginLeft: 4 }}>
        {dir === 'asc' ? '▲' : dir === 'desc' ? '▼' : ''}
    </Text>
);
const DataTable = <Row extends { id: number }>({
    data,
    columns,
    isCheckBox = false,
    searchAble = false,
    columnsVisibility = [],
    renderCell,
    onSelectionChange,
    sortIcon = defaultSortIcon,
    page = 1,
    totalPages = 1,
    pagination = false,
    paginationVariant,
    onPageChange = () => { },
    styles: s = {},
}: DataTableProps<Row>) => {
    const [sortKey, setSortKey] = useState<string>();
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>();
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [searchText, setSearchText] = useState('');
    const visibleCols =
        columnsVisibility.length > 0
            ? columns.filter((c) => columnsVisibility.includes(c.key))
            : columns;
    const jc = (a: Align | undefined): 'flex-start' | 'center' | 'flex-end' =>
        a === 'left' ? 'flex-start' : a === 'right' ? 'flex-end' : 'center';
    const onPressHeader = (col: Column) => {
        if (!col.sortable) return;
        if (sortKey !== col.key) {
            setSortKey(col.key);
            setSortDir('asc');
        } else {
            setSortDir(sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? undefined : 'asc');
            if (sortDir === undefined) setSortKey(undefined);
        }
    };
    const processedData = useMemo(() => {
        let out = data.filter((r) =>
            Object.values(r).some((v) =>
                v?.toString().toLowerCase().includes(searchText.toLowerCase()),
            ),
        );

        if (sortKey && sortDir) {
            out = [...out].sort((a, b) => {
                const va = a[sortKey as keyof Row] as unknown as string | number;
                const vb = b[sortKey as keyof Row] as unknown as string | number;
                if (va === vb) return 0;
                if (va == null) return 1;
                if (vb == null) return -1;
                return sortDir === 'asc' ? (va > vb ? 1 : -1) : va < vb ? 1 : -1;
            });
        }
        return out;
    }, [data, searchText, sortKey, sortDir]);

    const handleSelectAllToggle = () => {
        const updated = selectedRows.length === data.length ? [] : data.map((r) => r.id);
        setSelectedRows(updated);
        onSelectionChange?.(updated);
    };

    const handleToggleRow = (id: number) => {
        const updated = selectedRows.includes(id)
            ? selectedRows.filter((i) => i !== id)
            : [...selectedRows, id];
        setSelectedRows(updated);
        onSelectionChange?.(updated);
    };
    const renderHeader = () => (
        <View style={[styles.header, s.header]}>
            {isCheckBox && (
                <View style={[s.checkbox, styles.checkboxContainer]}>
                    <TouchableOpacity onPress={handleSelectAllToggle}>
                        <Text style={[styles.checkbox, s.checkbox, selectedRows.length === data.length && styles.isChecked, s.checkedCheckbox, { borderColor: selectedRows.length === data.length ? "#fff" : "" }]}>{selectedRows.length === data.length ? "✓" : ""}</Text>
                    </TouchableOpacity>
                </View>
            )}

            {visibleCols.map((col) => {
                const dir = sortKey === col.key ? sortDir : undefined;
                return (
                    <TouchableOpacity
                        key={col.key}
                        activeOpacity={col.sortable ? 0.6 : 1}
                        onPress={() => onPressHeader(col)}
                        style={[
                            styles.headerCell,
                            s.headerCell,
                        ]}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: jc(col.align) }}>
                            <Text
                                style={[
                                    styles.headerText,
                                    { textAlign: col.align ?? 'left' },
                                    { width: col.width ?? 70, justifyContent: jc(col.align) },
                                    s.headerText,
                                ]}
                            >
                                {col.title} <Text>{col.sortable && sortIcon(dir)}</Text>
                            </Text>

                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    const renderRow = ({ item, index }: { item: Row; index: number }) => {
        const zebraStyle = index % 2 === 0 ? s.rowEven : s.rowOdd;
        return (
            <View style={[styles.row, s.row, zebraStyle]}>
                {isCheckBox && (
                    <View
                        style={[
                            styles.checkboxContainer,

                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => handleToggleRow(item.id)}>
                            <Text style={[styles.checkbox, s.checkbox, selectedRows.includes(item.id) && styles.isChecked, s.checkedCheckbox,]}>{selectedRows.includes(item.id) ? "✓" : ""}</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {visibleCols.map((col) => {
                    const val = String(item[col.key as keyof Row] ?? '');
                    const custom = renderCell?.(item, col);

                    return (
                        <View
                            key={col.key}
                            style={[
                                styles.cell,
                                s.cell,
                            ]}
                        >
                            {custom != null ? custom : (
                                <Text
                                    style={[
                                        { textAlign: col.align ?? 'left' },
                                        styles.cellText,
                                        { width: col.width ?? 70, justifyContent: jc(col.align) },
                                        s.cellText,

                                    ]}
                                    onLayout={(event) => {
                                        const { width } = event.nativeEvent.layout;
                                        console.log(width)
                                    }}
                                    numberOfLines={col.numberOfLines} >
                                    {val}
                                </Text>
                            )}
                        </View>
                    );
                })}

            </View>
        );
    };
    return (
        <>
            <View style={[styles.container, s.container]}>
                {searchAble && (
                    <TextInput
                        style={[styles.searchInput, s.searchInput]}
                        placeholder="Search..."
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                )}

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ minWidth: 600 }}>
                        {renderHeader()}
                        <FlatList
                            data={processedData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderRow}
                            ListEmptyComponent={<Text style={[styles.noData, s.noData]}>No Data</Text>}
                        />
                    </View>
                </ScrollView>
                {pagination &&
                    <View style={{ alignItems: "center" }}>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            variant={paginationVariant}
                            style={{ marginTop: 12 }}
                        />
                    </View>
                }
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: { padding: 10, maxHeight: "100%", width: "92%" },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 6,
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
        borderWidth: 1,
        borderColor: '#d0d0d0',

    },
    headerCell: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: '#d0d0d0',
    },
    headerText: { fontWeight: 'bold' },

    row: {
        flexDirection: 'row',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#d0d0d0',
    },
    cell: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: '#d0d0d0',
        justifyContent: "center",
    },
    cellText: {},
    checkbox: {
        textAlign: "center",
        fontSize: 16,
        width: 20,
        height: 20,
        borderRadius: 3,
        borderColor: "#ccc",
        borderWidth: 1,
        lineHeight: 16
    },
    checkboxContainer: {
        width: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    isChecked: {
        borderColor: "#1a73e8",
        color: "#fff",
        backgroundColor: "#1a73e8"
    },
    noData: { padding: 20, textAlign: 'center' },
});

export default DataTable;
