import { useDayExpenses } from "@/contexts/dayExpenses";
import React, { useMemo } from "react";
import { View } from "react-native";
import { DataTable, Surface, Text } from "react-native-paper";

type ExpenseCardProps = {
  date: string;
}

export default function ExpenseCard (props: ExpenseCardProps) {
  const expenses = useDayExpenses(props.date);

  const total = useMemo(() => {
    return expenses.data.reduce((sum, expense) => sum + expense.amount, 0)
  }, [expenses]);

  return (
    <Surface
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.96)",
      }}
    >
      <View style={{ paddingHorizontal: 12, paddingTop: 12, paddingBottom: 2 }}>
        <Text variant="titleMedium">Expenses</Text>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>

        {expenses.data.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.category}</DataTable.Cell>
            <DataTable.Cell numeric>{item.amount.toLocaleString()}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Row>
          <DataTable.Cell>
            <Text style={{ fontWeight: "bold" }}>Total</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={{ fontWeight: "bold" }}>{total.toLocaleString()}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </Surface>
  );
}