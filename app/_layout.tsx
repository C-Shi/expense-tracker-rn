import AuthContextProvider from "@/store/AuthContext";
import { Slot } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <StatusBar barStyle="light-content"></StatusBar>
      <Slot />
    </AuthContextProvider>
  );
}
