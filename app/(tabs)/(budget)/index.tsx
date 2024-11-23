
import DateRangeInput from "@/components/DateRangeInput";
import EditDayExpenseForm from "@/components/EditDayExpenseForm";
import COLORS from "@/constants/colors";
import useExpenses, { DailyData, UseExpensesData } from "@/storage/useExpenses";
import { Expense } from "@/types";
import dayjs from "dayjs";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Appbar, DataTable, Divider, Modal, Text, TouchableRipple } from "react-native-paper"

const DEFAULT_RANGE = {
  start: "2024-11-22",
  end: "2024-12-01",
}

type SorterItem = [string, DailyData]

const sorter = (a: SorterItem, b: SorterItem) => {
  if (a[0] > b[0]) {
    return -1;
  } else if (a[0] < b[0]) {
    return 1;
  }
  return 0;

}

export default function BudgetScreen () {
  const expenses = useExpenses();

  const [dateRange, setDateRange] = useState(DEFAULT_RANGE)
  
  useFocusEffect(
    useCallback(() => {
      expenses.loadRange(dateRange.start, dateRange.end);
    }, [])
  );

  useEffect(() => {
    expenses.loadRange(dateRange.start, dateRange.end);
  }, [dateRange])

  const getTotalActual = (data: UseExpensesData) => {
    return Object.values(data).reduce((totalExpenses, e) => {
      const dailyExpenses = e.expenses.reduce((sum, item) => sum + item.amount, 0);

      return totalExpenses + dailyExpenses;
    }, 0);
  }

  const getTotalBudgeted = (data: UseExpensesData) => {
    return Object.values(data).reduce((sum, e) => sum + e.budget, 0);
  }

  const totalActual = useMemo(() => {
    return getTotalActual(expenses.data)
  }, [expenses.data]);

  const totalBudgeted = useMemo(() => {
    return getTotalBudgeted(expenses.data)
  }, [expenses.data]);

  const delta = useMemo(() => {
    return totalBudgeted - totalActual;
  }, [totalActual, totalBudgeted]);

  const router = useRouter();

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const onEditCancel = () => {
    setEditingExpense(null);
  }

  const onEditSuccess = () => {
    setEditingExpense(null);
    expenses.loadRange(dateRange.start, dateRange.end);
  }

  const getExpenseHandler = (e: Expense) => () => {
    setEditingExpense(e)
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Expenses" />
      </Appbar.Header>

      <ScrollView style={styles.container}>
        <View style={{ marginBottom: 16, paddingHorizontal: 16 }}>
          <DateRangeInput
            value={dateRange}
            onChange={(value) => {
              setDateRange(value);
            }}
          />
        </View>
        
        <View style={{ marginBottom: 40 }}>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>
                <Text variant="titleSmall">∑ Budgeted</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text variant="titleSmall">{totalBudgeted.toLocaleString()}</Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>
                <Text variant="titleSmall">∑ Actual</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text variant="titleSmall">{totalActual.toLocaleString()}</Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>
                <Text variant="titleSmall">Δ</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text
                  variant="titleSmall"
                  style={{ color: delta < 0 ? COLORS.HONGKONG :"green" }}
                >
                  {delta.toLocaleString()}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <View>
          {Object.entries(expenses.data).sort(sorter).map(([date, dailyData]) => (
            <View key={date} style={{ marginBottom: 24 }}>
              <TouchableRipple onPress={() => router.push(`/(tabs)/(budget)/${date}`)}>
                <Text variant="titleSmall" style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                  {dayjs(date).format("MMM D")}
                </Text>
              </TouchableRipple>

              <Divider />

              <View>
                <DataTable>
                  {dailyData.expenses.map((expense) => (
                    <DataTable.Row key={expense.id} onPress={getExpenseHandler(expense)}>
                      <DataTable.Cell>
                        <Text>{expense.name}</Text>
                      </DataTable.Cell>

                      <DataTable.Cell>
                        <Text>{expense.category}</Text>
                      </DataTable.Cell>

                      <DataTable.Cell numeric>
                        <Text>{expense.amount.toLocaleString()}</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.padBottom}/>
      </ScrollView>

      <Modal
        dismissable={false}
        visible={editingExpense !== null}
        contentContainerStyle={{ backgroundColor: "white", width: "90%", marginHorizontal: "auto"}}
      >
        {editingExpense && (
          <EditDayExpenseForm
            expense={editingExpense}
            onCancel={onEditCancel}
            onSuccess={onEditSuccess}
          />
        )}
      </Modal>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padBottom: {
    height: 80
  }
});
