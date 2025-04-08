import COLORS from "@/constant/COLORS";
import { AuthContext } from "@/store/AuthContext";
import ExpenseContextProvider from "@/store/ExpenseContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Stack, router } from "expo-router";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";

export default function AppLayout() {
  const { isAuth } = useContext(AuthContext);
  if (!isAuth) {
    return <Redirect href="/sign-in"></Redirect>;
  }
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
