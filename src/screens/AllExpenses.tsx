import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { useAppSelector } from "../hooks/use-redux";
import { EXPENSES } from "../lib/data";

const AllExpenses = () => {
  const expenses = useAppSelector((state) => state.expensesState.expenses);

  return (
    <>
      <ExpensesOutput expenses={expenses} expensesPeriod="Total" fallbackText="No registered expenses found!"/>
    </>
  );
};

export default AllExpenses;
