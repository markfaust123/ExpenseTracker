import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";

export const store = configureStore({
  reducer: {
    expensesState: expensesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: true
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
