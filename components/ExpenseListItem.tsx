import { View, Text, StyleSheet } from "react-native";
import { Expense } from "@/models";

export default function ExpenseListItem({ expense }: { expense: Expense }) {
  return (
    <View style={styles.expenseContainer}>
      <View>
        <Text>{expense.name}</Text>
        <Text>{expense.date}</Text>
      </View>
      <View style={styles.expenseAmount}>
        <Text style={styles.expenseAmountText}>${expense.amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
  },
  expenseAmount: {
    width: 100,
    backgroundColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 20,
  },
  expenseAmountText: {
    textAlign: "center",
  },
});
