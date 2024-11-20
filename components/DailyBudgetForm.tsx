import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

type DailyBudgetFormProps = {
  initialAmount?: number;
  onCancel: () => void;
  onSubmit: (a: number) => void;
}

export default function DailyBudgetForm (props: DailyBudgetFormProps) {
  const [amount, setAmount] = useState(props.initialAmount ?? 0);

  const amountValue = String(amount);
  const handleAmountChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "")

    setAmount(Number(digits));
  }

  const submit = () => {
    props.onSubmit(amount);
    // setAmount(0);
  }

  return (
    <>
      <View style={{ padding: 16 }}>
        <Text
          variant="titleMedium"
          style={{ marginBottom: 16 }}
        >
          Set Budget
        </Text>

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