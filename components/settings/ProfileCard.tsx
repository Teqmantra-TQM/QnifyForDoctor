import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

export default function ProfileCard() {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        const stored = await AsyncStorage.getItem("provider");
        if (stored) setProvider(JSON.parse(stored));
      } catch (err) {
        console.log(err);
      }
    };
    loadProvider();
  }, []);

  const gradient: readonly [string, string, string] = isDark
    ? ["#312e81", "#581c87", "#7e22ce"]
    : ["#4f46e5", "#7c3aed", "#db2777"];

  return (
    <LinearGradient style={styles.profileCard} colors={gradient}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={30} color="#fff" />
      </View>

      <View style={{ marginLeft: 14 }}>
        <Text style={styles.name}>
          {provider?.provider?.primary_contact_name || "User"}
        </Text>
        <Text style={styles.email}>
          {provider?.provider?.email || "email@example.com"}
        </Text>
        <Text style={styles.role}>
          {provider?.provider?.business_name || "Provider"}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "#e0e7ff",
    fontSize: 13,
  },
  role: {
    color: "#c7d2fe",
    fontSize: 12,
    marginTop: 2,
  },
});