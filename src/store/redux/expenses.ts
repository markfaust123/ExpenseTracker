import { createSlice } from "@reduxjs/toolkit";
import { EXPENSES } from "../../lib/data";
import { Expense } from "../../lib/types";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [] as Expense[],
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
    setExpenses: (state, action) => {
      state.expenses = action.payload.expenses;
    }
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export const setExpenses = expensesSlice.actions.setExpenses;
export default expensesSlice.reducer;
