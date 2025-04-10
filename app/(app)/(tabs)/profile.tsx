import { AuthContext } from "@/store/AuthContext";
import { useContext, useState } from "react";
import { View, Pressable, Image, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const userCtx = useContext(AuthContext);
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=3");

  const pickImage = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </Pressable>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>

      <View style={styles.options}>
        <Pressable style={styles.option}>
          <Text style={styles.optionText}>Edit Profile</Text>
        </Pressable>
        <Pressable style={styles.option}>
          <Text style={styles.optionText}>Settings</Text>
        </Pressable>
        <Pressable style={styles.option} onPress={userCtx.signOut}>
          <Text style={styles.optionText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f0f4f8",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 32,
  },
  options: {
    width: "100%",
    gap: 16,
  },
  option: {
    backgroundColor: "#e0e7ff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  optionText: {
    color: "#1e3a8a",
    fontWeight: "600",
  },
});
