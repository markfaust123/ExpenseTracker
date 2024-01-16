import { StyleSheet, Text, TextInput, View } from "react-native";
import Input from "./Input";
import { useState } from "react";

type InputValues = {
  amount: string;
  date: string;
  description: string;
};

const ExpenseForm = () => {
  const [inputValues, setInputValues] = useState<InputValues>({
    amount: "",
    date: "",
    description: "",
  });

  const handleInputChanged = (
    inputIdentifier: string,
    enteredValue: string
  ) => {
    setInputValues((currentState) => {
      return { ...currentState, [inputIdentifier]: enteredValue };
    });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleInputChanged.bind(this, "amount"),
            value: inputValues.amount,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: handleInputChanged.bind(this, "date"),
            value: inputValues.date,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: true, // default is true
          onChangeText: handleInputChanged.bind(this, "description"),
          value: inputValues.description,
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
  },
});

export default ExpenseForm;
