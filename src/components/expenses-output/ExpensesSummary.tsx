import { Text, View } from "react-native";
import { Expense } from "../../lib/types";

const ExpensesSummary = ({
  expenses,
  periodName,
}: {
  expenses: Expense[];
  periodName: string;
}) => {
  const sumOfExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  return (
    <View>
      <Text>Expense period: {periodName}</Text>
      <Text>Sum of expenses: {sumOfExpenses}</Text>
    </View>
  );
};

export default ExpensesSummary;
