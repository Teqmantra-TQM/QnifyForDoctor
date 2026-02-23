import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext } from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

export default function LogoutButton() {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const gradient: readonly [string, string] = isDark
    ? ["#991b1b", "#7f1d1d"]
    : ["#dc2626", "#b91c1c"];

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            // 🔥 CLEAR REGISTRATION STATE
            await AsyncStorage.removeItem("isRegistered");

            // 🔁 REDIRECT TO REGISTER
            router.replace("/login");
          },
        },
      ]
    );
  };

  return (
    <LinearGradient style={styles.button} colors={gradient}>
      <Pressable style={styles.inner} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="#fff" />
        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    marginTop: 10,
  },
  inner: {
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});
