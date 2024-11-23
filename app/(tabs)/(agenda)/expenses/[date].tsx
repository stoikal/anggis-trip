import CreateDayExpenseForm from '@/components/CreateDayExpenseForm';
import DailyBudgetForm from '@/components/DailyBudgetForm';
import EditDayExpenseForm from '@/components/EditdayExpenseForm';
import { useDayExpenses } from '@/contexts/dayExpenses';
import useDailyBudget from '@/storage/useDailyBudget';
import { Expense } from '@/types';
import dayjs from 'dayjs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, DataTable, FAB, Text, Modal } from 'react-native-paper';

export default function DailyExpenses() {
  const { date } = useLocalSearchParams();

  const expenses = useDayExpenses(date as string);
  const budget = useDailyBudget(date as string);

  const total = useMemo(() => {
    return expenses.data.reduce((sum, expense) => sum + expense.amount, 0)
  }, [expenses]);

  const variance = useMemo(() => {
    return budget.amount - total;
  }, [total, budget.amount])

  const varianceColor = useMemo(() => {
    return variance < 0 ? "red" : "green";
  }, [variance])

  const router = useRouter();

  const title = useMemo(() => {
    return dayjs(date as string).format("MMMM DD")
  }, [date]);


  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const hideEditExpenseModal = () => {
    setEditingExpense(null);
  }

  const [isCreateExpenseModalVisible, setIsCreateExpenseVisible] = useState(false);

  const showCreateExpenseModal = () => setIsCreateExpenseVisible(true);
  const hideCreateExpenseModal = () => setIsCreateExpenseVisible(false);

  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);

  const showBudgetModal = () => setIsBudgetModalVisible(true);
  const hideBudgetModal = () => setIsBudgetModalVisible(false);

  const submitBudget = async (amt: number) => {
    await budget.set(amt);
    hideBudgetModal();
  }

  const nextDay = () => {
    const tomorrow = dayjs(date as string).add(1, "day");
    const tommorowDatestring = tomorrow.format("YYYY-MM-DD");

    router.push(`/(tabs)/(agenda)/expenses/${tommorowDatestring}`)
  }

  const prevDay = () => {
    const yesterday = dayjs(date as string).subtract(1, "day");
    const yesterdayDatestring = yesterday.format("YYYY-MM-DD");

    router.push(`/(tabs)/(agenda)/expenses/${yesterdayDatestring}`)
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={title} />
        <Appbar.Action icon="chevron-left" onPress={prevDay} />
        <Appbar.Action icon="chevron-right" onPress={nextDay} />
      </Appbar.Header>

      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Category</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>

            {expenses.data.map((item) => (
              <DataTable.Row key={item.id} onPress={() => setEditingExpense(item)}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.category}</DataTable.Cell>
                <DataTable.Cell numeric>{item.amount.toLocaleString()}</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{ fontWeight: "bold" }}>Actual</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{ fontWeight: "bold" }}>{total.toLocaleString()}</Text>
              </DataTable.Cell>
            </DataTable.Row>
      
            <DataTable.Row onPress={showBudgetModal}>
              <DataTable.Cell>
                <Text style={{ fontWeight: "bold" }}>Budget</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{ fontWeight: "bold" }}>{(budget.amount).toLocaleString()}</Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>
                <Text variant="titleMedium">Variance</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{ fontWeight: "bold", color: varianceColor }}>{variance.toLocaleString()}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>

          <View style={{ height: 80 }}>

          </View>

        </ScrollView>
          <FAB
            size="small"
            icon="currency-jpy"
            style={{
              position: 'absolute',
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={showCreateExpenseModal}
          />
      </View>
      <Modal
        dismissable={false}
        visible={editingExpense !== null}
        contentContainerStyle={{ backgroundColor: "white", width: "90%", marginHorizontal: "auto"}}
      >
        {editingExpense && (
          <EditDayExpenseForm
            expense={editingExpense}
            onCancel={hideEditExpenseModal}
            onSuccess={hideEditExpenseModal}
          />
        )}
      </Modal>

      <Modal
        visible={isCreateExpenseModalVisible}
        dismissable={false}
        contentContainerStyle={{ backgroundColor: "white", width: "90%", marginHorizontal: "auto"}}
      >
        <CreateDayExpenseForm
          date={date as string}
          onCancel={hideCreateExpenseModal}
          onSuccess={hideCreateExpenseModal}
        />
      </Modal>

      <Modal
        visible={isBudgetModalVisible}
        dismissable={false}
        contentContainerStyle={{ backgroundColor: "white", width: "90%", marginHorizontal: "auto"}}
      >
        <DailyBudgetForm
          initialAmount={budget.amount}
          onCancel={hideBudgetModal}
          onSubmit={submitBudget}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
});
