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

export default function NewExpense() {
  const [newExpense, setNewExpense] = useState({
    date: new Date(),
    name: "",
    amount: 0,
  });

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const expensesCtx = useContext(ExpenseContext);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "New Expense",
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
    setNewExpense({ ...newExpense, name });
  }

  function onChangeAmount(val: string) {
    const amount = Number(val);
    setNewExpense({ ...newExpense, amount });
  }

  function onDateChange(val: Date | undefined) {
    setNewExpense({ ...newExpense, date: val! });
  }

  async function onAddExpense() {
    if (newExpense.amount > 0 && newExpense.date && newExpense.name !== "") {
      try {
        await expensesCtx.addExpense(new Expense(newExpense));
      } catch (err) {
        console.error((err as Error).message);
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
          value={newExpense.name}
          onChangeText={onChangeName}
        ></TextInput>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>How Much did you spend?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={newExpense.amount.toString()}
          onChangeText={onChangeAmount}
        ></TextInput>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>When did you spend?</Text>

        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={new Date(newExpense.date)}
            timeZoneName={timeZone}
            mode="date"
            display="spinner"
            onChange={(_, date) => onDateChange(date)}
          />
        </View>
      </View>

      <Pressable style={styles.pressable} onPress={onAddExpense}>
        <Text style={styles.buttonText}>Add</Text>
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
