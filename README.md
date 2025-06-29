# React Native Smart DataTable 📊

A powerful, customizable React Native smart table component with support for:

✅ Sorting  
✅ Column visibility  
✅ Custom cell rendering  
✅ Search  
✅ Pagination  
✅ Row selection via checkboxes

## 🔧 Installation

```bash
npm install react-native-smart-data-table

📐 Column Type

type Column = {
  key: string;
  title: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: number;
  numberOfLines?: number;
};



## 🚀 Usage

import DataTable, { Column } from '@shared/components/DataTable';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface UserRow {
    id: number;
    name: string;
    age: number;
    dob: string;
    address: string;
    email: string;
    description: string;
}


const columns: Column[] = [
    { key: 'id', title: 'ID', sortable: true, align: 'left' },
    { key: 'name', title: 'Name', sortable: true, align: 'left' },
    { key: 'age', title: 'Age', sortable: true, align: 'left' },
    { key: 'dob', title: 'DOB', sortable: true, align: 'left', width: 100 },
    { key: 'address', title: 'Address', sortable: false, align: "left", width: 100 },
    { key: 'email', title: 'Email', sortable: false, align: 'left', width: 130 },
    { key: 'description', title: 'Description', sortable: false, align: 'left', width: 400, numberOfLines: 1 },
    { key: '__actions', title: 'Actions', align: 'right' },
];


const data: UserRow[] = [
    { id: 1, name: 'Alice', age: 24, dob: '1999-04-15', address: '123 Main', email: 'bilal.kalri@gmail.com', description: "A powerful, customizable React Native smart table component" },
    { id: 2, name: 'Bob', age: 30, dob: '1995-08-22', address: '456 Elm', email: 'bob@x.com', description: "A powerful, customizable React Native smart table component" },
]

const arrow = (dir: 'asc' | 'desc' | undefined) => {
    if (dir === 'asc') return <Text style={{ marginLeft: 4 }}>🔼</Text>;
    if (dir === 'desc') return <Text style={{ marginLeft: 4 }}>🔽</Text>;
    return null;
};

const renderCell = (row: UserRow, column: Column) => {
    if (column.key === '__actions') {
        return (
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity onPress={() => console.log('Edit', row.id)}>
                    <Text style={{ color: '#1a73e8' }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Delete', row.id)}>
                    <Text style={{ color: '#d93025' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return undefined;
};

const Table = () => {
    const [page, setPage] = useState(1);
    return (
        <View style={styles.container}>
            <DataTable<UserRow>
                data={data}
                columns={columns}
                isCheckBox
                sortIcon={arrow}
                renderCell={renderCell}
                pagination={true}
                totalPages={23}
                onPageChange={(page) => setPage(page)}
                onSelectionChange={(val) => console.log(val)}
                page={page}
                searchAble
                paginationVariant="classic"

                styles={{
                    rowEven: { backgroundColor: '#ffffff' },
                    rowOdd: { backgroundColor: '#f5f8ff' },
                    header: { backgroundColor: '#1a73e8', borderColor: 'transparent', borderRadius: 4 },
                    headerCell: { borderLeftColor: "transparent" },
                    headerText: { color: '#fff', fontWeight: '600', fontSize: 14 },
                    row: { borderColor: "transparent" },
                    cell: { borderLeftColor: 'transparent' },
                    cellText: { fontSize: 12, textAlign: "left" },
                }}

            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: { marginTop: 30, flex: 1, marginBottom: 30, backgroundColor: '#fff', margin: "auto", borderRadius: 5 },
});

export default Table;


## 📚 Props

| Prop                | Type                                               | Description                                                     |
| ------------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| `data`              | `Row[]`                                            | Array of row objects (each row must have a unique `id`).        |
| `columns`           | `Column[]`                                         | Defines the table structure (title, key, sortable, width, etc). |
| `isCheckBox`        | `boolean`                                          | Enables row selection with checkboxes.                          |
| `searchAble`        | `boolean`                                          | Enables a search input above the table.                         |
| `columnsVisibility` | `string[]`                                         | Keys of columns to be shown (hides others).                     |
| `renderCell`        | `(row: Row, column: Column) => ReactNode`          | Render custom content for a specific cell.                      |
| `sortIcon`          | `(dir: 'asc' \| 'desc' \| undefined) => ReactNode` | Optional custom sort icon renderer.                             |
| `styles`            | `DataTableStyles`                                  | Customize table styles (header, row, checkbox, etc).            |
| `pagination`        | `boolean`                                          | Show pagination controls below the table.                       |
| `page`              | `number`                                           | Current page number.                                            |
| `totalPages`        | `number`                                           | Total number of pages.                                          |
| `onPageChange`      | `(page: number) => void`                           | Callback triggered when the page changes.                       |
| `paginationVariant` | `"classic"` \| `"basic"`                           | Style of pagination control (classic = full, basic = compact).  |
| `onSelectionChange` | `(selectedIds: number[]) => void`                  | Callback with selected row IDs when selection changes.          |