import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../lib/constants";
import { useAppDispatch } from "../hooks/use-redux";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/redux/expenses";
import ExpenseForm from "../components/manage-expense/ExpenseForm";
import { Expense } from "../lib/types";
import { storeExpense } from "../lib/api";

const ManageExpenses = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const editedExpense = route.params?.expense;
  const isEditing = !!editedExpense;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const dispatch = useAppDispatch();

  const handleDeleteExpense = () => {
    dispatch(deleteExpense({ removeId: editedExpense.id }));
    navigation.goBack();
  };

  const handleSubmit = async (expenseData: Omit<Expense, "id">) => {
    if (isEditing) {
      dispatch(
        updateExpense({
          updateId: editedExpense.id,
          data: {
            ...expenseData,
            id: editedExpense.id,
          },
        })
      );
    } else {
      const newId = await storeExpense(expenseData);
      dispatch(
        addExpense({
          id: newId,
          ...expenseData,
        })
      );
    }
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={editedExpense}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />
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
});

export default ManageExpenses;
