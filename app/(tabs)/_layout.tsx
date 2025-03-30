import { TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "left",
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 20,
            }}
          >
            <FontAwesome name="plus" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recent",
          tabBarLabelPosition: "below-icon",
          tabBarIcon: () => (
            <FontAwesome name="filter" size={26} color="black" />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="all"
        options={{
          title: "All Expenses",
          tabBarLabelPosition: "below-icon",
          tabBarIcon: () => (
            <FontAwesome name="calendar" size={26} color="black" />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
