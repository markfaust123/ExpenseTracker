import { Text } from "react-native";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { useAppSelector } from "../hooks/use-redux";

const RecentExpenses = () => {
  const expenses = useAppSelector((state) => state.expensesState.expenses);

  return (
    <>
      <ExpensesOutput expenses={expenses} expensesPeriod="7 Days" />
    </>
  );
};

export default RecentExpenses;
