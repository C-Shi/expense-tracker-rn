import { useContext } from "react";
import { ExpenseContext } from "@/store/ExpenseContext";
import ExpenseList from "@/components/ExpenseList";

export default function All() {
  const expenseCtx = useContext(ExpenseContext);

  return <ExpenseList expenseList={expenseCtx.expenses} />;
}
