import { TouchableOpacity } from "react-native";
import { Tabs, useRouter } from "expo-router";
import COLORS from "@/constant/COLORS";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.tint,
        },
        headerTitleStyle: {
          color: COLORS.bright,
        },
        tabBarStyle: {
          backgroundColor: COLORS.tint,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: COLORS.bright,
        tabBarInactiveTintColor: COLORS.light,
        headerTitleAlign: "left",
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 20,
            }}
            onPress={() => {
              router.push("/modal?page=new");
            }}
          >
            <FontAwesome name="plus" size={24} color={COLORS.bright} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recent",
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="filter"
              size={26}
              color={focused ? COLORS.bright : COLORS.light}
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="all"
        options={{
          title: "All Expenses",
          tabBarLabelPosition: "below-icon",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="calendar"
              size={26}
              color={focused ? COLORS.bright : COLORS.light}
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
