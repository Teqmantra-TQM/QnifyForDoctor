import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const API_URL =
  "https://qk3g2ita50.execute-api.ap-southeast-2.amazonaws.com/dev/provider";

/* ---------- Types ---------- */

type RegisterForm = {
  business_name: string;
  primary_contact_name: string;
  email: string;
  mobile: string;
  mobile_country_code: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
  business_commence_year_month: string;
};

type InputProps = TextInputProps & {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
};

/* ---------- Screen ---------- */

export default function RegisterScreen() {
  const [form, setForm] = useState<RegisterForm>({
    business_name: "",
    primary_contact_name: "",
    email: "",
    mobile: "",
    mobile_country_code: "+61",
    address: "",
    city: "",
    country: "Australia",
    postcode: "",
    business_commence_year_month: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (key: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.business_name || !form.email || !form.mobile) {
      Alert.alert("Validation Error", "Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          business_verified: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      /* ✅ SAVE REGISTRATION STATE */
      await AsyncStorage.setItem("isRegistered", "true");

      Alert.alert("Success 🎉", "Registration completed successfully", [
        {
          text: "Continue",
          onPress: () => {
            router.replace("/(tabs)");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Provider Registration</Text>
      <Text style={styles.subtitle}>
        Register your business to get started
      </Text>

      <View style={styles.card}>
        <Input label="Business Name" value={form.business_name} onChangeText={(v) => onChange("business_name", v)} />
        <Input label="Primary Contact Name" value={form.primary_contact_name} onChangeText={(v) => onChange("primary_contact_name", v)} />
        <Input label="Email" keyboardType="email-address" value={form.email} onChangeText={(v) => onChange("email", v)} />

        <View style={styles.row}>
          <Input label="Code" value={form.mobile_country_code} containerStyle={{ flex: 1, marginRight: 8 }} onChangeText={(v) => onChange("mobile_country_code", v)} />
          <Input label="Mobile" keyboardType="number-pad" value={form.mobile} containerStyle={{ flex: 2 }} onChangeText={(v) => onChange("mobile", v)} />
        </View>

        <Input label="Address" value={form.address} onChangeText={(v) => onChange("address", v)} />
        <Input label="City" value={form.city} onChangeText={(v) => onChange("city", v)} />
        <Input label="Country" value={form.country} onChangeText={(v) => onChange("country", v)} />
        <Input label="Postcode" keyboardType="number-pad" value={form.postcode} onChangeText={(v) => onChange("postcode", v)} />
        <Input label="Business Commence (YYYY-MM)" value={form.business_commence_year_month} onChangeText={(v) => onChange("business_commence_year_month", v)} />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ---------- Input ---------- */

function Input({ label, containerStyle, ...props }: InputProps) {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input} />
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F5F7FB", flexGrow: 1 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16 },
  inputContainer: { marginBottom: 14 },
  label: { fontSize: 12, color: "#555", marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12 },
  row: { flexDirection: "row" },
  button: { backgroundColor: "#4F46E5", padding: 14, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
});
