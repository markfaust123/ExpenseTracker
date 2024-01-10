import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../lib/types";
import { GlobalStyles } from "../../lib/constants";

const ExpensesOutput = ({expenses, expensesPeriod}: {expenses: Expense[], expensesPeriod: string}) => {
    return (
      <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
        <ExpensesList expenses={expenses}/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    }
})

export default ExpensesOutput;