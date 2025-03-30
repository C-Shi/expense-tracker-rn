import { createContext, useState } from "react";

class Expense {
    id: string;
    date: string;
    name: string;
    amount: number;

    constructor({ date, name, amount } : { date: string, name: string, amount: number}) {
        this.id = crypto.randomUUID()
        this.date = date
        this.name = name
        this.amount = amount
    }
}

interface ExpenseContextModel {
    expenses: Expense[];
    addExpense: (expense: { date: string; name: string; amount: number }) => void;
    removeExpense: (expense: Expense) => void;
}

const ExpenseContext = createContext({} as ExpenseContextModel)

export { ExpenseContext }

export default function ExpenseContextProvider({children} : { children: any}) {
    const [expenses, setExpense] = useState<Expense[]>([])

    const addExpense = (expense : any) : void => {
        setExpense(prev => [...prev, new Expense(expense)])
    }

    const removeExpense = (expense : Expense) : void => {
        setExpense(prev => prev.filter(e => e.id !== expense.id))
    }

    const value = {expenses, addExpense, removeExpense} as ExpenseContextModel

    return <ExpenseContext.Provider value={value}>
        { children}
    </ExpenseContext.Provider>
}