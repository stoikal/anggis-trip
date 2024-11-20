import CreateDayExpenseForm from '@/components/CreateDayExpenseForm';
import EditDayExpenseForm from '@/components/EditdayExpenseForm';
import { Expense, useDayExpenses } from '@/contexts/dayExpenses';
import dayjs from 'dayjs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, DataTable, FAB, IconButton, Modal } from 'react-native-paper';

export default function DailyExpenses() {
  const { date } = useLocalSearchParams();

  const expenses = useDayExpenses(date as string);

  const total = useMemo(() => {
    return expenses.data.reduce((sum, expense) => sum + expense.amount, 0)
  }, [expenses]);

  const variance = useMemo(() => {
    return 2000 - total;
  }, [total])

  const varianceColor = useMemo(() => {
    return variance < 0 ? "red" : "green";
  }, [variance])

  const router = useRouter();

  const title = useMemo(() => {
    return dayjs(date as string).format("MMMM DD")
  }, []);


  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const hideEditExpenseModal = () => {
    setEditingExpense(null);
  }

  const [isCreateExpenseModalVisible, setIsCreateExpenseVisible] = useState(false);

  const showCreateExpenseModal = () => setIsCreateExpenseVisible(true);
  const hideCreateExpenseModal = () => setIsCreateExpenseVisible(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={title} />
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
      
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{ fontWeight: "bold" }}>Budget</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{ fontWeight: "bold" }}>{(5000).toLocaleString()}</Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{ fontWeight: "bold" }}>Variance</Text>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
});
