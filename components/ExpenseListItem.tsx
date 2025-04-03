import { View, Text, StyleSheet, Pressable } from "react-native";
import { Expense } from "@/models";
import { useRouter } from "expo-router";

export default function ExpenseListItem({ expense }: { expense: Expense }) {
  const router = useRouter();
  return (
    <Pressable
      style={styles.expenseContainer}
      onPress={() => router.push(`/modal?page=edit&id=${expense.id}`)}
    >
      <View>
        <Text>{expense.name}</Text>
        <Text>{expense.date}</Text>
      </View>
      <View style={styles.expenseAmount}>
        <Text style={styles.expenseAmountText}>${expense.amount}</Text>
      </View>
    </Pressable>
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
