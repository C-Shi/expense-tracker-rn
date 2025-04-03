import { ScrollView, StyleSheet } from "react-native";
import ExpenseListItem from "@/components/ExpenseListItem";
import { Expense } from "@/models";
import COLORS from "@/constant/COLORS";

export default function ExpenseList({
  expenseList,
}: {
  expenseList: Expense[];
}) {
  const displayExpenses = expenseList.map((expense) => {
    return <ExpenseListItem expense={expense} key={expense.id} />;
  });
  return (
    <ScrollView style={expenseListStyle.expensesContainer}>
      {displayExpenses}
    </ScrollView>
  );
}

const expenseListStyle = StyleSheet.create({
  expensesContainer: {
    flex: 1,
    backgroundColor: COLORS.tint,
    padding: 10,
  },
});
