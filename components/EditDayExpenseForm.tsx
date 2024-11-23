import { CATEGORIES } from "@/db/db";
import { useDayExpenses } from "@/contexts/dayExpenses";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { Button, Dialog, IconButton, Text, TextInput } from "react-native-paper";
import { PaperSelect } from 'react-native-paper-select';
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import { Expense } from "@/types";

type EditDayExpenseFormProps = {
  expense: Expense;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function EditDayExpenseForm (props: EditDayExpenseFormProps) {
  const categoryOptions = useMemo(() => {
    return Object.values(CATEGORIES).map((category, index) => ({
      _id: String(index + 1),
      value: category
    }))
  }, []);

  const initialSelectedCategories = categoryOptions.filter((cat) => cat.value === props.expense.category);


  const [categoryText, setCategoryText] = useState(props.expense.category);
  const [selectedCategories, setSelectedCategories] = useState<ListItem[]>(initialSelectedCategories);


  const [name, setName] = useState(props.expense.name);
  const [amount, setAmount] = useState(props.expense.amount);

  const amountValue = String(amount);
  const handleAmountChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "")

    setAmount(Number(digits));
  }

  const expenses = useDayExpenses(props.expense.date)

  const submit = async () => {
    await expenses.update({
      id: props.expense.id,
      date: props.expense.date,
      name,
      amount,
      category: categoryText
    });

    props.onSuccess();
  }

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const hideDeleteDialog = () => {
    setIsDeleteDialogVisible(false);
  }

  const deleteExpense = async () => {
    expenses.deleteById(props.expense.id);
    hideDeleteDialog();
    props.onSuccess();
  }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Text
            variant="titleMedium"
            // style={{ marginBottom: 16 }}
          >
            Expense
          </Text>
        </View>
        <View style={{ padding: 0}}>
          <IconButton icon="delete" size={24} onPress={() => setIsDeleteDialogVisible(true)} />
        </View>
      </View>
      <View
        style={{ paddingHorizontal: 16 }}
      >

        <TextInput
          value={name}
          label="Item"
          mode="outlined"
          style={{ marginBottom: 8 }}
          onChangeText={setName}
        />
      
        <PaperSelect
          textInputMode="outlined"
          value={categoryText}
          label="Category"
          arrayList={categoryOptions}
          selectedArrayList={selectedCategories}
          multiEnable={false}
          onSelection={({ selectedList, text }) => {
            setCategoryText(text);
            setSelectedCategories(selectedList);
          }}
          hideSearchBox
        />
      
        <TextInput
          value={amountValue}
          label="Amount"
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 8 }}
          right={<TextInput.Icon icon="currency-jpy" />}
          onChangeText={handleAmountChange}
        />

      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1}}>
          <Button onPress={props.onCancel} style={{ borderRadius: 0 }}>
            <Text>Cancel</Text>
          </Button>
        </View>
        <View style={{ flex: 1 }}>

          <Button onPress={submit} style={{ borderRadius: 0 }}>
            <Text>Save</Text>
          </Button>
        </View>
      </View>

      <Dialog visible={isDeleteDialogVisible} onDismiss={hideDeleteDialog}>
        <Dialog.Title>Delete</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Are you sure you want to delete this item?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDeleteDialog}>Cancel</Button>
          <Button
            mode="contained"
            onPress={deleteExpense}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}