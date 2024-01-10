import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { EXPENSES } from "../lib/data";

const AllExpenses = () => {
  return (
    <>
      <ExpensesOutput expenses={EXPENSES} expensesPeriod="Total" />
    </>
  );
};

export default AllExpenses;
