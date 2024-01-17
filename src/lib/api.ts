import axios from "axios";
import { Expense } from "./types";

const API_URL = "https://expense-tracker-410ae-default-rtdb.firebaseio.com";

export const storeExpense = async (
  expenseData: Omit<Expense, "id">
): Promise<string> => {
  const response = await axios.post(`${API_URL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get(`${API_URL}/expenses.json`);

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
};

export const putExpense = (
  id: string,
  expenseData: Omit<Expense, "id">
): Promise<Expense> => {
  return axios.put(`${API_URL}/expenses/${id}.json`, expenseData);
};

export const removeExpense = async (id: string): Promise<Expense> => {
  return axios.delete(`${API_URL}/expenses/${id}.json`);
};
