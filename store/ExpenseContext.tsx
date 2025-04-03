import { createContext, useState } from "react";
import { Expense } from "@/models";

interface ExpenseContextModel {
  expenses: Expense[];
  addExpense: (expense: { date: string; name: string; amount: number }) => void;
  removeExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
  getRecent: (num: number | null) => Expense[];
}

const ExpenseContext = createContext({} as ExpenseContextModel);

export { ExpenseContext };

export default function ExpenseContextProvider({
  children,
}: {
  children: any;
}) {
  const [expenses, setExpense] = useState<Expense[]>([
    new Expense({ date: "2024-09-01", amount: 15.6, name: "book" }),
    new Expense({ date: "2024-09-02", amount: 46.0, name: "grocery" }),
    new Expense({ date: "2024-09-03", amount: 23.0, name: "gas" }),
    new Expense({ date: "2024-09-04", amount: 6.0, name: "lottery" }),
    new Expense({ date: "2024-09-05", amount: 100.0, name: "house cleaning" }),
    new Expense({ date: "2024-09-06", amount: 50, name: "restaurant" }),
    new Expense({ date: "2024-09-07", amount: 60, name: "restaurant" }),
    new Expense({ date: "2024-09-08", amount: 50, name: "restaurant" }),
    new Expense({ date: "2024-09-09", amount: 120, name: "restaurant" }),
    new Expense({ date: "2024-09-10", amount: 423, name: "hotel" }),
    new Expense({ date: "2024-09-11", amount: 48.25, name: "restaurant" }),
    new Expense({ date: "2024-09-12", amount: 48.25, name: "restaurant" }),
    new Expense({ date: "2024-09-13", amount: 48.25, name: "restaurant" }),
  ]);

  const addExpense = (expense: any): void => {
    setExpense((prev) => [...prev, new Expense(expense)]);
  };

  const removeExpense = (id: string): void => {
    setExpense((prev) => prev.filter((e) => e.id !== id));
  };

  const getRecent = (num: number): Expense[] => {
    return [...expenses]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, num + 1);
  };

  const updateExpense = (expense: Expense): void => {
    setExpense((prev) =>
      prev.map((e) => {
        if (e.id == expense.id) {
          return { ...expense, id: e.id };
        }
        return e;
      })
    );
  };

  const value = {
    expenses,
    addExpense,
    removeExpense,
    updateExpense,
    getRecent,
  } as ExpenseContextModel;

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}
