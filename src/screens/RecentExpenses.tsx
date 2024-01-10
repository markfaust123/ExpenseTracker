import { Text } from "react-native";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { EXPENSES } from "../lib/data";

const RecentExpenses = () => {
    return (
      <>
        <ExpensesOutput expenses={EXPENSES} expensesPeriod="7 Days" />
      </>
    );
}

export default RecentExpenses;