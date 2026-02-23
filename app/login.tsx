import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const API_BASE =
  "https://qk3g2ita50.execute-api.ap-southeast-2.amazonaws.com/dev/provider";

export default function LoginScreen() {
  const [countryCode, setCountryCode] = useState("61");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!mobile || !countryCode) {
    Alert.alert("Validation Error", "Please enter mobile and country code");
    return;
  }

  setLoading(true);

  try {
    const cleanCountryCode = countryCode.replace("+", "");

    const url =
      `https://qk3g2ita50.execute-api.ap-southeast-2.amazonaws.com/dev/provider` +
      `?countryCode=${encodeURIComponent(cleanCountryCode)}` +
      `&mobile=${encodeURIComponent(mobile)}`;

    console.log("🔗 API URL:", url);

    const response = await fetch(url);

    console.log("📡 Status:", response.status);

    const text = await response.text();
    console.log("📦 Raw response:", text);

    if (!response.ok) {
      throw new Error("NOT_FOUND");
    }

    if (!text) {
      throw new Error("EMPTY_RESPONSE");
    }

    const provider = JSON.parse(text);

    if (!provider || Object.keys(provider).length === 0) {
      throw new Error("NOT_FOUND");
    }

    // ✅ SUCCESS
    await AsyncStorage.setItem("isRegistered", "true");
    await AsyncStorage.setItem("mobile", mobile);
    await AsyncStorage.setItem("countryCode", cleanCountryCode);
    await AsyncStorage.setItem("provider", JSON.stringify(provider));

    router.replace("/(tabs)");
  } catch (error: any) {
    console.error("❌ LOGIN ERROR:", error);

    Alert.alert(
      "Not Registered",
      "No provider found. Please register.",
      [
        {
          text: "Register",
          onPress: () =>
            router.replace({
              pathname: "/register",
              params: { mobile, countryCode },
            }),
        },
      ]
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Login using your registered mobile number
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Country Code</Text>
        <TextInput
          style={styles.input}
          value={countryCode}
          keyboardType="number-pad"
          onChangeText={setCountryCode}
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          keyboardType="number-pad"
          placeholder="412345678"
          onChangeText={setMobile}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/register")}
          style={{ marginTop: 16 }}
        >
          <Text style={styles.link}>
            New user? Register here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F7FB",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },
  label: {
    fontSize: 12,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  link: {
    color: "#4F46E5",
    textAlign: "center",
    fontWeight: "600",
  },
});
