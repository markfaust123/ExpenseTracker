import { createSlice } from "@reduxjs/toolkit";
import { EXPENSES } from "../../lib/data";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: EXPENSES,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload.expense);
    },
    removeExpense: (state, action) => {
        const expenses = state.expenses;
      const index = expenses.findIndex(
        (expense) => expense.id === action.payload.removeId
      );
      expenses.splice(index, 1);
    },
    updateExpense: (state, action) => {
      const expenses = state.expenses;
      const updateExpense = expenses.find((expense) => expense.id === action.payload.updateId);
      updateExpense!.description = action.payload.updateDescription;
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const removeExpense = expensesSlice.actions.removeExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export default expensesSlice.reducer;
