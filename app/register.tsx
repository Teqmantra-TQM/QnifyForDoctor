import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
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
    mobile_country_code: "61",
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
  const params = useLocalSearchParams();

useEffect(() => {
  if (params.mobile) {
    setForm((prev) => ({
      ...prev,
      mobile: params.mobile as string,
      mobile_country_code: (params.countryCode as string)?.replace("+", "") || "61",
    }));
  }
}, []);

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
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style="dark" />

        <Text style={styles.headerTitle}>Provider Registration</Text>
        <Text style={styles.headerSubtitle}>
          Register your business to get started
        </Text>

        <View style={styles.formContainer}>
          <Input 
            label="Business Name" 
            placeholder="Enter business name"
            value={form.business_name} 
            onChangeText={(v) => onChange("business_name", v)} 
          />
          
          <Input 
            label="Primary Contact Name" 
            placeholder="Enter contact person name"
            value={form.primary_contact_name} 
            onChangeText={(v) => onChange("primary_contact_name", v)} 
          />
          
          <Input 
            label="Email" 
            placeholder="example@business.com"
            keyboardType="email-address" 
            autoCapitalize="none"
            value={form.email} 
            onChangeText={(v) => onChange("email", v)} 
          />

          <View style={styles.row}>
            <Input 
              label="Code" 
              value={form.mobile_country_code} 
              containerStyle={{ flex: 1, marginRight: 12 }} 
              onChangeText={(v) => onChange("mobile_country_code", v)} 
            />
            <Input 
              label="Mobile" 
              placeholder="000 000 000"
              keyboardType="number-pad" 
              value={form.mobile} 
              containerStyle={{ flex: 3 }} 
              onChangeText={(v) => onChange("mobile", v)} 
            />
          </View>

          <Input 
            label="Address" 
            placeholder="Street address"
            value={form.address} 
            onChangeText={(v) => onChange("address", v)} 
          />
          
          <Input 
            label="City" 
            placeholder="City"
            value={form.city} 
            onChangeText={(v) => onChange("city", v)} 
          />
          
          <Input 
            label="Country" 
            value={form.country} 
            onChangeText={(v) => onChange("country", v)} 
          />
          
          <Input 
            label="Postcode" 
            placeholder="Postcode"
            keyboardType="number-pad" 
            value={form.postcode} 
            onChangeText={(v) => onChange("postcode", v)} 
          />
          
          <Input 
            label="Business Commence (YYYY-MM)" 
            placeholder="2023-01"
            value={form.business_commence_year_month} 
            onChangeText={(v) => onChange("business_commence_year_month", v)} 
          />

          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={handleSubmit} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerButtonText}>Register</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ---------- Input ---------- */

function Input({ label, containerStyle, ...props }: InputProps) {
  return (
    <View style={[styles.inputGroup, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        {...props} 
        style={styles.input} 
        placeholderTextColor="#999"
      />
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  registerButton: {
    backgroundColor: "#000",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});