import { ScrollView, StyleSheet } from "react-native";
import ExpenseListItem from "@/components/ExpenseListItem";
import { Expense } from "@/models";

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
    marginHorizontal: 20,
    flex: 1,
  },
});
