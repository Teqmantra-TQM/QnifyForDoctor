import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  useEffect(() => {
    console.log("ROOT INDEX LOADED"); // 👈 DEBUG LINE

    const check = async () => {
      const value = await AsyncStorage.getItem("isRegistered");
      console.log("isRegistered =", value); // 👈 DEBUG LINE
      setIsRegistered(value === "true");
      setLoading(false);
    };

    check();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={isRegistered ? "/(tabs)" : "/login"} />;
}
