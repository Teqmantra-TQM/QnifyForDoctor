import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

interface Props {
  waitingCount: number;
  completedCount: number;
}

type Provider = {
  primary_contact_name?: string;
  business_name?: string;
};

export default function HeaderCard({
  waitingCount,
  completedCount,
}: Props) {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  const totalPatients = waitingCount + completedCount;
  const remaining = waitingCount;

  const gradientColors: readonly [string, string] = isDark
    ? ["#312e81", "#1e1b4b"]
    : ["#4f46e5", "#9333ea"];

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const mobile = await AsyncStorage.getItem("mobile");
        const countryCode = await AsyncStorage.getItem("countryCode");

        if (!mobile || !countryCode) {
          setLoading(false);
          return;
        }

        const url = `https://qk3g2ita50.execute-api.ap-southeast-2.amazonaws.com/dev/provider?countryCode=${countryCode}&mobile=${mobile}`;

        const res = await fetch(url);
        const data = await res.json();

        setProvider(data);
      } catch (error) {
        console.error("Failed to fetch provider", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerCard}
    >
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.welcome}>Welcome back,</Text>

          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Text style={styles.doctor}>
                {provider?.primary_contact_name || "Doctor"}
              </Text>
              <Text style={styles.date}>{today}</Text>
            </>
          )}
        </View>

        <View style={styles.pulseIcon}>
          <Ionicons name="pulse" size={24} color="#fff" />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.smallBox}>
          <Text style={styles.smallLabel}>Patients Today</Text>
          <Text style={styles.smallValue}>{totalPatients}</Text>
        </View>

        <View style={styles.smallBox}>
          <Text style={styles.smallLabel}>Remaining</Text>
          <Text style={styles.smallValue}>{remaining}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcome: {
    color: "#e0e7ff",
    fontSize: 14,
  },
  doctor: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    color: "#c7d2fe",
    fontSize: 12,
  },
  pulseIcon: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  smallBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 12,
    borderRadius: 12,
  },
  smallLabel: {
    color: "#e0e7ff",
    fontSize: 12,
  },
  smallValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
