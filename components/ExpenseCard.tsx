import React from "react";
import { Surface, Text } from "react-native-paper";
import { DataTable } from 'react-native-paper';

// type ExpenseCardProps = {
//   test: string;
// }

export default function ExpenseCard () {
  const items = [
    { key: 1, name: "Bakso", category: "Food/Drink", amount: 1000 },
    { key: 2, name: "Day Trip", category: "Activities", amount: 2 },
  ]
  return (
    <Surface

    >
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Category</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>

        {items.map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.category}</DataTable.Cell>
            <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
          </DataTable.Row>
        ))}

        {/* <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        /> */}
      </DataTable>
    </Surface>
  );
}