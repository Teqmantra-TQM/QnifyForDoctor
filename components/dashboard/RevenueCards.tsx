import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

export default function RevenueCards() {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const todayRevenue = 12450;
  const monthlyRevenue = 188000;

  // Dark mode gets deeper tones
  const todayGradient: readonly [string, string] = isDark
    ? ["#065f46", "#064e3b"]
    : ["#10b981", "#059669"];

  const monthlyGradient: readonly [string, string] = isDark
    ? ["#3730a3", "#4c1d95"]
    : ["#6366f1", "#9333ea"];

  return (
    <View style={styles.gridRow}>
      <LinearGradient
        colors={todayGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.revenueCard}
      >
        <Ionicons name="cash" size={20} color="#fff" />
        <Text style={styles.title}>Today Revenue</Text>
        <Text style={styles.value}>
          ${todayRevenue.toLocaleString()}
        </Text>
      </LinearGradient>

      <LinearGradient
        colors={monthlyGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.revenueCard}
      >
        <Ionicons name="trending-up" size={20} color="#fff" />
        <Text style={styles.title}>Monthly</Text>
        <Text style={styles.value}>
          ${(monthlyRevenue / 1000).toFixed(0)}K
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  gridRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  revenueCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6,
  },
  value: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
});
