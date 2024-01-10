import { Text } from "react-native";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { EXPENSES } from "../lib/data";

const RecentExpenses = () => {
    return (
      <>
        <Text>RecentExpenses Screen</Text>
        <ExpensesOutput expenses={EXPENSES} expensesPeriod="7 days" />
      </>
    );
}

export default RecentExpenses;