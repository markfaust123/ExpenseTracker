import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../lib/constants";
import Button from "../components/ui/Button";
import { useAppDispatch } from "../hooks/use-redux";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/redux/expenses";
import { Expense } from "../lib/types";
import { getFormattedDate } from "../util/date";
import ExpenseForm from "../components/manage-expense/ExpenseForm";

const ManageExpenses = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const dispatch = useAppDispatch();

  const handleDeleteExpense = () => {
    dispatch(deleteExpense({ removeId: editedExpenseId }));
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    if (isEditing) {
      dispatch(
        updateExpense({
          updateId: editedExpenseId,
          data: {
            id: editedExpenseId,
            amount: 19.99,
            date: new Date("2024-02-14"),
            description: "UPDATED EXPENSE",
          },
        })
      );
    } else {
      dispatch(
        addExpense({
          id: Math.random().toString(),
          amount: 19.99,
          date: new Date("2024-02-14"),
          description: "ADDED EXPENSE",
        })
      );
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={handleCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={handleConfirm} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
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

export default ManageExpenses;
