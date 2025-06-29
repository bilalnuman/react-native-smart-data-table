"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const Pagination_1 = __importDefault(require("./Pagination"));
const defaultSortIcon = (dir) => (react_1.default.createElement(react_native_1.Text, { style: { marginLeft: 4 } }, dir === 'asc' ? '▲' : dir === 'desc' ? '▼' : ''));
const DataTable = ({ data, columns, isCheckBox = false, searchAble = false, columnsVisibility = [], renderCell, onSelectionChange, sortIcon = defaultSortIcon, page = 1, totalPages = 1, pagination = false, paginationVariant, onPageChange = () => { }, styles: s = {}, }) => {
    const [sortKey, setSortKey] = (0, react_1.useState)();
    const [sortDir, setSortDir] = (0, react_1.useState)();
    const [selectedRows, setSelectedRows] = (0, react_1.useState)([]);
    const [searchText, setSearchText] = (0, react_1.useState)('');
    const visibleCols = columnsVisibility.length
        ? columns.filter((c) => columnsVisibility.includes(c.key))
        : columns;
    const jc = (align) => align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center';
    const onPressHeader = (col) => {
        if (!col.sortable)
            return;
        if (sortKey !== col.key) {
            setSortKey(col.key);
            setSortDir('asc');
        }
        else {
            const next = sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? undefined : 'asc';
            setSortDir(next);
            if (!next)
                setSortKey(undefined);
        }
    };
    const processedData = (0, react_1.useMemo)(() => {
        let out = data.filter((r) => Object.values(r).some((v) => typeof v === 'string' || typeof v === 'number'
            ? v.toString().toLowerCase().includes(searchText.toLowerCase())
            : false));
        if (sortKey && sortDir) {
            out = [...out].sort((a, b) => {
                const va = a[sortKey];
                const vb = b[sortKey];
                if (va === vb)
                    return 0;
                if (va == null)
                    return 1;
                if (vb == null)
                    return -1;
                return sortDir === 'asc' ? (va > vb ? 1 : -1) : va < vb ? 1 : -1;
            });
        }
        return out;
    }, [data, searchText, sortKey, sortDir]);
    const handleSelectAllToggle = () => {
        const updated = selectedRows.length === data.length ? [] : data.map((r) => r.id);
        setSelectedRows(updated);
        onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(updated);
    };
    const handleToggleRow = (id) => {
        const updated = selectedRows.includes(id)
            ? selectedRows.filter((i) => i !== id)
            : [...selectedRows, id];
        setSelectedRows(updated);
        onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(updated);
    };
    const renderHeader = () => (react_1.default.createElement(react_native_1.View, { style: [styles.header, s.header] },
        isCheckBox && (react_1.default.createElement(react_native_1.View, { style: [s.checkbox, styles.checkboxContainer] },
            react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleSelectAllToggle },
                react_1.default.createElement(react_native_1.Text, { style: [
                        styles.checkbox,
                        s.checkbox,
                        selectedRows.length === data.length && styles.isChecked,
                        s.checkedCheckbox,
                        { borderColor: selectedRows.length === data.length ? '#fff' : '' },
                    ] }, selectedRows.length === data.length ? '✓' : '')))),
        visibleCols.map((col) => {
            var _a, _b;
            const dir = sortKey === col.key ? sortDir : undefined;
            return (react_1.default.createElement(react_native_1.TouchableOpacity, { key: col.key, activeOpacity: col.sortable ? 0.6 : 1, onPress: () => onPressHeader(col), style: [styles.headerCell, s.headerCell] },
                react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'row', justifyContent: jc(col.align), width: (_a = col.width) !== null && _a !== void 0 ? _a : 70 } },
                    react_1.default.createElement(react_native_1.Text, { style: [
                            styles.headerText,
                            { textAlign: (_b = col.align) !== null && _b !== void 0 ? _b : 'left' },
                            s.headerText,
                        ] },
                        col.title,
                        " ",
                        col.sortable && sortIcon(dir)))));
        })));
    const renderRow = ({ item, index }) => {
        const zebraStyle = index % 2 === 0 ? s.rowEven : s.rowOdd;
        return (react_1.default.createElement(react_native_1.View, { style: [styles.row, s.row, zebraStyle] },
            isCheckBox && (react_1.default.createElement(react_native_1.View, { style: [styles.checkboxContainer] },
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => handleToggleRow(item.id) },
                    react_1.default.createElement(react_native_1.Text, { style: [
                            styles.checkbox,
                            s.checkbox,
                            selectedRows.includes(item.id) && styles.isChecked,
                            s.checkedCheckbox,
                        ] }, selectedRows.includes(item.id) ? '✓' : '')))),
            visibleCols.map((col) => {
                var _a, _b, _c;
                const val = String((_a = item[col.key]) !== null && _a !== void 0 ? _a : '');
                const custom = renderCell === null || renderCell === void 0 ? void 0 : renderCell(item, col);
                return (react_1.default.createElement(react_native_1.View, { key: col.key, style: [styles.cell, s.cell, { width: (_b = col.width) !== null && _b !== void 0 ? _b : 70 }] }, custom != null ? (custom) : (react_1.default.createElement(react_native_1.Text, { style: [
                        { textAlign: (_c = col.align) !== null && _c !== void 0 ? _c : 'left' },
                        styles.cellText,
                        s.cellText,
                    ], numberOfLines: col.numberOfLines }, val))));
            })));
    };
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, s.container] },
        searchAble && (react_1.default.createElement(react_native_1.TextInput, { style: [styles.searchInput, s.searchInput], placeholder: "Search...", value: searchText, onChangeText: setSearchText })),
        react_1.default.createElement(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false },
            react_1.default.createElement(react_native_1.View, { style: { minWidth: 600 } },
                renderHeader(),
                react_1.default.createElement(react_native_1.FlatList, { data: processedData, keyExtractor: (item) => item.id.toString(), renderItem: renderRow, ListEmptyComponent: react_1.default.createElement(react_native_1.Text, { style: [styles.noData, s.noData] }, "No Data") }))),
        pagination && (react_1.default.createElement(react_native_1.View, { style: { alignItems: 'center' } },
            react_1.default.createElement(Pagination_1.default, { currentPage: page, totalPages: totalPages, onPageChange: onPageChange, variant: paginationVariant, style: { marginTop: 12 } })))));
};
exports.default = DataTable;
const styles = react_native_1.StyleSheet.create({
    container: { padding: 10, maxHeight: '100%', width: '92%' },
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
        borderLeftWidth: react_native_1.StyleSheet.hairlineWidth,
        borderLeftColor: '#d0d0d0',
        minWidth: 50,
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
        borderLeftWidth: react_native_1.StyleSheet.hairlineWidth,
        borderLeftColor: '#d0d0d0',
        minWidth: 50,
    },
    cellText: {},
    checkbox: {
        textAlign: 'center',
        fontSize: 16,
        width: 20,
        height: 20,
        borderRadius: 3,
        borderColor: '#ccc',
        borderWidth: 1,
        lineHeight: 16,
    },
    checkboxContainer: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    isChecked: {
        borderColor: '#1a73e8',
        color: '#fff',
        backgroundColor: '#1a73e8',
    },
    noData: { padding: 20, textAlign: 'center' },
});
