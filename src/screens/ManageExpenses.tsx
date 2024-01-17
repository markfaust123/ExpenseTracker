import { useLayoutEffect, useState } from "react";
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
import { putExpense, removeExpense, storeExpense } from "../lib/api";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const ManageExpenses = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const editedExpense = route.params?.expense;
  const isEditing = !!editedExpense;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const dispatch = useAppDispatch();

  const handleDeleteExpense = async () => {
    dispatch(deleteExpense({ removeId: editedExpense.id }));
    setIsLoading(true);
    await removeExpense(editedExpense.id);
    // Technically don't need to set because component dismounts upon pop
    // setIsLoading(false);
    navigation.goBack();
  };

  const handleSubmit = async (expenseData: Omit<Expense, "id">) => {
    setIsLoading(true);
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
      await putExpense(editedExpense.id, expenseData);
    } else {
      const newId = await storeExpense(expenseData);
      dispatch(
        addExpense({
          id: newId,
          ...expenseData,
        })
      );
    }
    // Technically don't need to set because component dismounts upon pop
    // setIsLoading(false);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
