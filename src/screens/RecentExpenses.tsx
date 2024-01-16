import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { useAppSelector } from "../hooks/use-redux";
import { getDateMinusDays, getFormattedDate } from "../util/date";

const RecentExpenses = () => {
  const expenses = useAppSelector((state) => state.expensesState.expenses);
  const recentExpenses = expenses.filter((expenses) => {
    const today = new Date();
    const dateSevenDaysAgo = getDateMinusDays(today, 7);
    const date = new Date(expenses.date);
    return (date > dateSevenDaysAgo);
  });

  return (
    <>
      <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the last 7 days."/>
    </>
  );
};

export default RecentExpenses;
