import { Stack } from "expo-router/stack";
import ExpenseContextProvider from "@/store/ExpenseContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import COLORS from "@/constant/COLORS";

export default function RootLayout() {
  return (
    <ExpenseContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 20,
                }}
                onPress={() => {
                  router.back();
                }}
              >
                <FontAwesome name="close" size={24} color={COLORS.light} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </ExpenseContextProvider>
  );
}
