import { FlatList, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../lib/types";

const ExpensesOutput = ({expenses, expensesPeriod}: {expenses: Expense[], expensesPeriod: string}) => {
    return (
      <View>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
        <ExpensesList expenses={expenses}/>
      </View>
    );
}

export default ExpensesOutput;