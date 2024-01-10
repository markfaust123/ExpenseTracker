import { Text } from "react-native";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { EXPENSES } from "../lib/data";

const AllExpenses = () => {
  return (
    <>
      <Text>AllExpenses Screen</Text>
      <ExpensesOutput expenses={EXPENSES} expensesPeriod="7 days"/>
    </>
  );
};

export default AllExpenses;
