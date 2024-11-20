import { CATEGORIES } from "@/db/db";
import { useDayExpenses } from "@/contexts/dayExpenses";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { PaperSelect } from 'react-native-paper-select';
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";

type CreateDayExpenseFormProps = {
  date: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function CreateDayExpenseForm (props: CreateDayExpenseFormProps) {
  const categoryOptions = useMemo(() => {
    return Object.values(CATEGORIES).map((category, index) => ({
      _id: String(index + 1),
      value: category
    }))
  }, []);


  const [categoryText, setCategoryText] = useState(categoryOptions[0].value);
  const [selectedCategories, setSelectedCategories] = useState<ListItem[]>(categoryOptions.slice(0, 1));


  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const amountValue = String(amount);
  const handleAmountChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "")

    setAmount(Number(digits));
  }

  const expenses = useDayExpenses(props.date)

  const submit = async () => {
    await expenses.create({
      name,
      amount,
      category: categoryText
    });

    props.onSuccess();
  }

  return (
    <>
      <View
        style={{ padding: 16 }}
      >
        <Text
          variant="titleMedium"
          style={{ marginBottom: 16 }}
        >
          Expense
        </Text>

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
    </>
  )
}