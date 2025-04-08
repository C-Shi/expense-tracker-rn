import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import COLORS from "@/constant/COLORS"; // Your existing colors
import { AuthContext } from "@/store/AuthContext";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const toggleAuthMode = () => setIsLogin((prev) => !prev);

  const handleSubmit = async () => {
    if (isLogin) {
      // Handle login logic
      try {
        await authContext.signInSignUp(email, password, "signIn");
        router.replace("/");
      } catch (err) {
        alert((err as Error).message);
      }
    } else {
      // Handle signup logic
      try {
        await authContext.signInSignUp(email, password, "signUp");
        router.replace("/");
      } catch (err) {
        alert((err as Error).message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#333"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#333"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLogin ? "Login" : "Create Account"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleAuthMode}>
        <Text style={styles.switchText}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.dark,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.bright,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.light,
    color: COLORS.dark,
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
  },
  button: {
    backgroundColor: COLORS.bright,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.dark,
    textAlign: "center",
    fontWeight: "bold",
  },
  switchText: {
    color: COLORS.bright,
    textAlign: "center",
    marginTop: 20,
  },
});
