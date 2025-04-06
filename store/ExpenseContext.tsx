import { createContext, useState, useEffect } from "react";
import { Expense } from "@/models";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface ExpenseContextModel {
  expenses: Expense[];
  addExpense: (expense: {
    date: Date;
    name: string;
    amount: number;
  }) => Promise<any>;
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
  const [expenses, setExpense] = useState<Expense[]>([]);
  const [ready, setReady] = useState<Boolean>(false);
  const URL = process.env.EXPO_PUBLIC_FIREBASE_URL;

  useEffect(() => {
    _fetchExpense();
  }, []);

  const addExpense = async (expense: any): Promise<any> => {
    const response = await fetch(URL + "/expenses.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    if (response.ok) {
      const { name } = await response.json();
      setExpense((prev) => [...prev, new Expense({ ...expense, id: name })]);
    } else {
      throw new Error(`HTTP Post Error! Status: ${response.status}`);
    }
  };

  const removeExpense = async (id: string): Promise<any> => {
    const response = await fetch(URL + `/expenses/${id}.json`, {
      method: "DELETE",
    });

    if (response.ok) {
      setExpense((prev) => prev.filter((e) => e.id !== id));
    } else {
      throw new Error(`HTTP Delete Error! Status: ${response.status}`);
    }
  };

  const getRecent = (num: number): Expense[] => {
    return [...expenses]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, num + 1);
  };

  const updateExpense = async (expense: Expense): Promise<any> => {
    const response = await fetch(URL + `/expenses/${expense.id}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: expense.name,
        date: expense.date,
        amount: expense.amount,
      }),
    });

    if (response.ok) {
      setExpense((prev) =>
        prev.map((e) => {
          if (e.id == expense.id) {
            return { ...expense, id: e.id };
          }
          return e;
        })
      );
    } else {
      throw new Error(`HTTP Put Error! Status: ${response.status}`);
    }
  };

  const _fetchExpense = async (): Promise<any> => {
    try {
      const response = await fetch(URL + "/expenses.json");
      if (response.ok) {
        const data = await response.json();
        setExpense(() => {
          const expenses = [];
          for (const id in data) {
            expenses.push(
              new Expense({
                id,
                name: data[id].name,
                date: new Date(data[id].date),
                amount: data[id].amount,
              })
            );
          }
          return expenses;
        });
      } else {
        throw new Error(`HTTP Get Expense Error! Status: ${response.status} `);
      }
    } catch (err) {
      alert("Fetch Data Failed!");
    } finally {
      setReady(true);
    }
  };

  const value = {
    expenses,
    addExpense,
    removeExpense,
    updateExpense,
    getRecent,
  } as ExpenseContextModel;

  if (!ready) {
    return <FontAwesome name="spinner" size={24} color="black" />;
  }

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}
