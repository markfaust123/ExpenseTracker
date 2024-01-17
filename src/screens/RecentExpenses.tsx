import { useEffect } from "react";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { useAppDispatch, useAppSelector } from "../hooks/use-redux";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../lib/api";
import { setExpenses } from "../store/redux/expenses";

const RecentExpenses = () => {
  const expenses = useAppSelector((state) => state.expensesState.expenses);
  const dispatch = useAppDispatch();
  const recentExpenses = expenses.filter((expenses) => {
    const today = new Date();
    const dateSevenDaysAgo = getDateMinusDays(today, 7);
    const date = new Date(expenses.date);
    return date > dateSevenDaysAgo;
  });

  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();
      dispatch(setExpenses({ expenses: expenses }));
    };
    getExpenses();
  }, []);

  return (
    <>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 Days"
        fallbackText="No expenses registered for the last 7 days."
      />
    </>
  );
};

export default RecentExpenses;
