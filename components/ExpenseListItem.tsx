import { View, Text, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import { Expense } from "@/models";
import { useRouter } from "expo-router";
import COLORS from "@/constant/COLORS";
import { useState, useContext } from "react";
import { ExpenseContext } from "@/store/ExpenseContext";

export default function ExpenseListItem({ expense }: { expense: Expense }) {
  const { removeExpense } = useContext(ExpenseContext);
  const router = useRouter();

  const onPressHandler = () => {
    router.push(`/modal?page=edit&id=${expense.id}`);
  };

  const onSwipeCloseHandler = () => {
    removeExpense(expense.id);
  };
  return (
    <GestureHandlerRootView>
      <Swipeable onSwipeableClose={onSwipeCloseHandler}>
        <Pressable style={styles.expenseContainer} onPress={onPressHandler}>
          <View>
            <Text style={styles.expenseText}>{expense.name}</Text>
            <Text style={styles.expenseText}>{expense.date}</Text>
          </View>
          <View style={styles.expenseAmount}>
            <Text style={styles.expenseAmountText}>${expense.amount}</Text>
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: "rgb(48, 64, 89)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  expenseAmount: {
    width: 100,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingVertical: 10,
  },
  expenseAmountText: {
    textAlign: "center",
    color: COLORS.dark,
  },
  expenseText: {
    color: COLORS.bright,
    fontWeight: "bold",
  },
});
