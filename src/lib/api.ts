import axios from "axios";
import { Expense } from "./types";

const API_URL =
  "https://expense-tracker-410ae-default-rtdb.firebaseio.com";

export const storeExpense = (expenseData: Omit<Expense, "id">) => {
    axios.post(`${API_URL}/expenses.json`, expenseData);
}

export const fetchExpenses = async (): Promise<Expense[]> => {
    const response = await axios.get(
      `${API_URL}/expenses.json`
    );

    const expenses = [];

    for (const key in response.data) {
        const expense: Expense = {
          id: key,
          amount: response.data[key].amount,
          date: response.data[key].date,
          description: response.data[key].description,
        };
        expenses.push(expense);
    }

    return expenses;
}