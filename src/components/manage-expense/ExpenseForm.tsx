import { StyleSheet, Text, TextInput, View } from "react-native";
import Input from "./Input";
import { useState } from "react";

const ExpenseForm = () => {
  const [amount, setAmount] = useState<string>();
  const [date, setDate] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleAmountChanged = (newAmount: string) => {
    setAmount(newAmount);
  };

  const handleDateChanged = (newDate: string) => {
    setDate(newDate);
  };

  const handleDescriptionChanged = (newDescription: string) => {
    setDescription(newDescription);
  };

  return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleAmountChanged,
            value: amount,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: handleDateChanged,
            value: date,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: true, // default is true
          onChangeText: handleDescriptionChanged,
          value: description,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center",
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    }
})

export default ExpenseForm;
