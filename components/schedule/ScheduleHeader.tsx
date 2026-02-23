import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appointment } from "../../app/(tabs)/schedule";
import { AppThemeContext } from "../../context/AppThemeContext";

interface Props {
  appointments: Appointment[];
}

export default function ScheduleHeader({ appointments }: Props) {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const remaining = appointments.filter(
    (a) => a.status === "upcoming"
  ).length;

  const gradient: readonly [string, string] = isDark
    ? ["#5b21b6", "#1e1b4b"]
    : ["#7c3aed", "#9333ea"];

  return (
    <LinearGradient colors={gradient} style={styles.headerCard}>
      <View style={styles.headerRow}>
        <View style={styles.calendarIcon}>
          <Ionicons name="calendar" size={20} color="#fff" />
        </View>

        <View>
          <Text style={styles.headerTitle}>Today's Schedule</Text>
          <Text style={styles.headerSubtitle}>
            Monday, February 9, 2026
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>
            {appointments.length}
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={styles.statValue}>{remaining}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#e9d5ff",
    fontSize: 12,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 18,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 14,
    borderRadius: 14,
  },
  statLabel: {
    color: "#ede9fe",
    fontSize: 12,
  },
  statValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
});
