// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// import {
//     ActivityIndicator,
//     Alert,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";

// const API_BASE =
//   "https://qk3g2ita50.execute-api.ap-southeast-2.amazonaws.com/dev/provider";

// export default function LoginScreen() {
//   const [countryCode, setCountryCode] = useState("61");
//   const [mobile, setMobile] = useState("");
//   const [loading, setLoading] = useState(false);

// const handleLogin = async () => {
//   if (!mobile || !countryCode) {
//     Alert.alert("Validation Error", "Please enter mobile and country code");
//     return;
//   }

//   setLoading(true);

//   try {
//     const cleanCountryCode = countryCode.replace("+", "");

//     const url =
//       `https://qk3g2ita50.execute-api.ap-southeast-2.amazonaws.com/dev/provider` +
//       `?countryCode=${encodeURIComponent(cleanCountryCode)}` +
//       `&mobile=${encodeURIComponent(mobile)}`;

//     console.log("🔗 API URL:", url);

//     const response = await fetch(url);

//     console.log("📡 Status:", response.status);

//     const text = await response.text();
//     console.log("📦 Raw response:", text);

//     if (!response.ok) {
//       throw new Error("NOT_FOUND");
//     }

//     if (!text) {
//       throw new Error("EMPTY_RESPONSE");
//     }

//     const provider = JSON.parse(text);

//     if (!provider || Object.keys(provider).length === 0) {
//       throw new Error("NOT_FOUND");
//     }

//     // ✅ SUCCESS
//     await AsyncStorage.setItem("isRegistered", "true");
//     await AsyncStorage.setItem("mobile", mobile);
//     await AsyncStorage.setItem("countryCode", cleanCountryCode);
//     await AsyncStorage.setItem("provider", JSON.stringify(provider));

//     router.replace("/(tabs)");
//   } catch (error: any) {
//     console.error("❌ LOGIN ERROR:", error);

//     Alert.alert(
//       "Not Registered",
//       "No provider found. Please register.",
//       [
//         {
//           text: "Register",
//           onPress: () =>
//             router.replace({
//               pathname: "/register",
//               params: { mobile, countryCode },
//             }),
//         },
//       ]
//     );
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <StatusBar style="dark" />

//       <Text style={styles.title}>Welcome Back</Text>
//       <Text style={styles.subtitle}>
//         Login using your registered mobile number
//       </Text>

//       <View style={styles.card}>
//         <Text style={styles.label}>Country Code</Text>
//         <TextInput
//           style={styles.input}
//           value={countryCode}
//           keyboardType="number-pad"
//           onChangeText={setCountryCode}
//         />

//         <Text style={styles.label}>Mobile Number</Text>
//         <TextInput
//           style={styles.input}
//           value={mobile}
//           keyboardType="number-pad"
//           placeholder="412345678"
//           onChangeText={setMobile}
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Login</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => router.push("/register")}
//           style={{ marginTop: 16 }}
//         >
//           <Text style={styles.link}>
//             New user? Register here
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// /* ---------- Styles ---------- */

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#F5F7FB",
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     marginBottom: 6,
//     color: "#111",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 24,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 16,
//     elevation: 4,
//   },
//   label: {
//     fontSize: 12,
//     color: "#555",
//     marginBottom: 6,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 16,
//     fontSize: 14,
//   },
//   button: {
//     backgroundColor: "#4F46E5",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   link: {
//     color: "#4F46E5",
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
// Import your OtpModal component
import OtpModal from "./OtpModal";

export default function LoginScreen() {
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // 1. Add state to control modal visibility
  const [showOtpModal, setShowOtpModal] = useState(false);

  const keyboardHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        Animated.timing(keyboardHeight, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const logoSize = keyboardHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 250],
  });

  // 2. Update handleLogin to open the modal
  const handleLogin = () => {
    if (mobile.length < 10) return; // Basic validation
    
    setLoading(true);
    // Simulate an API call delay before showing the modal
    setTimeout(() => {
      setLoading(false);
      setShowOtpModal(true);
    }, 1000);
  };

 // Inside LoginScreen function
const handleVerifyOtp = (code: string) => {
  // For testing purposes, we ignore the code value and proceed
  setShowOtpModal(false);

  // Use router.push to navigate to your register.tsx file
  // Expo Router uses file-based routing, so we use the filename "register"
  router.push({
    pathname: "/register",
    params: { phoneNumber: `${countryCode}${mobile}` }
  });
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <Animated.Image
            source={require("../assets/logo.png")}
            style={[
              styles.logo,
              { width: logoSize, height: logoSize },
            ]}
            resizeMode="contain"
          />

          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.title}>Login/Sign-up</Text>
            <Text style={styles.subtitle}>
              Enter your phone number to continue
            </Text>

            <View style={styles.phoneContainer}>
              <TextInput
                style={styles.codeInput}
                value={countryCode}
                editable={false} // Usually country code isn't edited here
              />
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter mobile number"
                keyboardType="number-pad"
                value={mobile}
                onChangeText={setMobile}
                maxLength={10}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, mobile.length < 10 && { opacity: 0.7 }]}
              onPress={handleLogin}
              disabled={loading || mobile.length < 10}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* 3. Place the OtpModal here */}
          <OtpModal
            visible={showOtpModal}
            phoneNumber={`${countryCode} ${mobile}`}
            onVerify={handleVerifyOtp}
            onClose={() => setShowOtpModal(false)}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// ... Styles remain exactly the same as your original code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center", 
    paddingHorizontal: 24,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
    color: "#000",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 30,
  },
  phoneContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    marginBottom: 20,
  },
  codeInput: {
    width: 70,
    padding: 14,
    borderRightWidth: 1,
    borderColor: "#E5E5E5",
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  phoneInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});