import { StyleSheet, Text, TextInput, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch } from "../../hooks/use-redux";
import { addExpense, updateExpense } from "../../store/redux/expenses";
import { Expense } from "../../lib/types";

type InputValues = {
  amount: string;
  date: string;
  description: string;
};

const ExpenseForm = ({
  editedExpense,
  isEditing,
}: {
  editedExpense: Expense;
  isEditing: boolean;
}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [inputValues, setInputValues] = useState<InputValues>(
    isEditing
      ? {
          amount: editedExpense.amount.toString(),
          date: editedExpense.date,
          description: editedExpense.description,
        }
      : {
          amount: "",
          date: "",
          description: "",
        }
  );

  const handleInputChanged = (
    inputIdentifier: string,
    enteredValue: string
  ) => {
    setInputValues((currentState) => {
      return { ...currentState, [inputIdentifier]: enteredValue };
    });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    if (isEditing) {
      dispatch(
        updateExpense({
          updateId: editedExpense.id,
          data: {
            id: editedExpense.id,
            amount: parseFloat(inputValues.amount),
            date: inputValues.date,
            description: inputValues.description,
          },
        })
      );
    } else {
      dispatch(
        addExpense({
          id: Math.random().toString(),
          amount: parseFloat(inputValues.amount),
          date: inputValues.date,
          description: inputValues.description,
        })
      );
    }
    navigation.goBack();
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
      <View style={styles.buttons}>
        <Button mode="flat" onPress={handleCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={handleConfirm} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ExpenseForm;
