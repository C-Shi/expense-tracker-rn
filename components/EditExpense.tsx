import { Expense } from "@/models";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "expo-router";
import COLORS from "@/constant/COLORS";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Button,
} from "react-native";
import { ExpenseContext } from "@/store/ExpenseContext";

export default function EditExpense({ id }: { id: string }) {
  const expensesCtx = useContext(ExpenseContext);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const editingExpense = {
    ...expensesCtx.expenses.find((e) => e.id == id),
  } as Expense;

  const [expense, setExpense] = useState({
    id: editingExpense.id,
    name: editingExpense.name,
    amount: editingExpense.amount.toString(),
    date: editingExpense.date,
  });

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Update Expense",
      headerStyle: {
        backgroundColor: COLORS.tint,
      },
      headerTitleStyle: {
        fontSize: 20,
        color: COLORS.bright,
      },
      headerLeft: () => {
        <Button title="Close" onPress={() => navigation.goBack()} />;
      },
    });
  }, []);

  function onChangeName(name: string) {
    setExpense({ ...expense, name });
  }

  function onChangeAmount(amount: string) {
    setExpense({ ...expense, amount });
  }

  function onDateChange(date: Date) {
    setExpense({ ...expense, date });
  }

  async function saveExpense() {
    if (
      expense &&
      parseFloat(expense.amount) > 0 &&
      expense.date &&
      expense.name !== ""
    ) {
      try {
        await expensesCtx.updateExpense({
          ...expense,
          amount: parseFloat(expense.amount),
        } as Expense);
      } catch (err) {
        alert((err as Error).message);
      } finally {
        navigation.goBack();
      }
    } else {
      alert("Please Fill all the required field");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>What did you spend on?</Text>
        <TextInput
          style={styles.input}
          value={expense!.name}
          onChangeText={onChangeName}
        ></TextInput>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>How Much did you spend?</Text>
        <TextInput
          style={styles.input}
          inputMode="decimal"
          value={expense!.amount.toString()}
          onChangeText={onChangeAmount}
        ></TextInput>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>When did you spend?</Text>

        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={expense!.date}
            timeZoneName={timeZone}
            mode="date"
            display="spinner"
            onChange={(event, date) => onDateChange(date!)}
          />
        </View>
      </View>

      <Pressable style={styles.pressable} onPress={saveExpense}>
        <Text style={styles.buttonText}>Update</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.tint,
    flex: 1,
    alignItems: "center",
  },
  field: {
    backgroundColor: COLORS.dark,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.bright,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.bright,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: COLORS.bright,
  },
  datePickerContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.light,
    paddingVertical: 10,
    borderRadius: 8,
  },
  pressable: {
    backgroundColor: COLORS.dark,
    width: 120,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center", // Centers text horizontally
    justifyContent: "center", // Centers text vertically
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.bright,
    fontSize: 16,
    fontWeight: "bold",
  },
});
