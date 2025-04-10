import NewExpense from "@/components/NewExpense";
import EditExpense from "@/components/EditExpense";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function Modal() {
  // register a ?page query params for the URL
  const { page, id } = useLocalSearchParams();
  let component;
  switch (page) {
    case "new":
      component = <NewExpense></NewExpense>;
      break;
    case "edit":
      component = <EditExpense id={id as string}></EditExpense>;
      break;
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      {component}
    </ScrollView>
  );
}
