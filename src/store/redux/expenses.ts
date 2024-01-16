import { createSlice } from "@reduxjs/toolkit";
import { EXPENSES } from "../../lib/data";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: EXPENSES,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses = [action.payload, ...state.expenses];
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.removeId
      );
    },
    updateExpense: (state, action) => {
      const updateableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.updateId
      );
      const updateableExpense = state.expenses[updateableExpenseIndex];
      const updatedItem = { ...updateableExpense, ...action.payload.data };
      state.expenses[updateableExpenseIndex] = updatedItem;
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export default expensesSlice.reducer;
