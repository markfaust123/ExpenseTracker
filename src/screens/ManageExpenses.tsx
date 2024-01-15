import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../lib/constants";
import Button from "../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../hooks/use-redux";
import {
  addExpense,
  removeExpense,
  updateExpense,
} from "../store/redux/expenses";
import { Expense } from "../lib/types";

const ManageExpenses = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const dispatch = useAppDispatch();

  const closeModal = () => {
    navigation.goBack();
  };

  const handleDeleteExpense = () => {
    dispatch(removeExpense({ removeId: editedExpenseId }));
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleConfirm = (expense: Expense) => {
    if (isEditing) {
      dispatch(
        updateExpense({
          updateId: editedExpenseId,
          data: { ...expense, description: "UPDATED EXPENSE" },
        })
      );
    } else {
      dispatch(addExpense({ expense: expense }));
    }
    closeModal();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={handleCancel} style={styles.button}>
          Cancel
        </Button>
        <Button
          onPress={handleConfirm.bind(this, {
            id: Math.random().toString(),
            amount: 17.38,
            date: new Date().toISOString().substring(0, 10),
            description: "the beach",
          })}
          style={styles.button}
        >
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
