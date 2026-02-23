import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

interface Props {
  waitingCount: number;
  completedCount: number;
}

export default function FinanceSummary({
  waitingCount,
  completedCount,
}: Props) {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const todayRevenue = 12450;
  const pendingPayments = 3;
  const totalPatients = waitingCount + completedCount;

  const theme = {
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#ffffff" : "#111827",
    subText: isDark ? "#94a3b8" : "#6b7280",
    defaultBox: isDark ? "#334155" : "#f3f4f6",
    pendingBox: isDark ? "#78350f" : "#fef3c7",
    averageBox: isDark ? "#1e3a8a" : "#e0e7ff",
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Finance Summary
      </Text>

      {/* Total Collected */}
      <View
        style={[
          styles.summaryBox,
          { backgroundColor: theme.defaultBox },
        ]}
      >
        <Text style={{ color: theme.subText }}>
          Total Collected Today
        </Text>
        <Text style={[styles.bold, { color: theme.text }]}>
          ${todayRevenue.toLocaleString()}
        </Text>
      </View>

      {/* Pending Payments */}
      <View
        style={[
          styles.summaryBox,
          { backgroundColor: theme.pendingBox },
        ]}
      >
        <Text style={{ color: theme.text }}>
          Pending Payments
        </Text>
        <Text style={[styles.bold, { color: theme.text }]}>
          {pendingPayments} patients
        </Text>
      </View>

      {/* Average Per Patient */}
      <View
        style={[
          styles.summaryBox,
          { backgroundColor: theme.averageBox },
        ]}
      >
        <Text style={{ color: theme.text }}>
          Average per Patient
        </Text>
        <Text style={[styles.bold, { color: theme.text }]}>
          $
          {totalPatients > 0
            ? Math.round(todayRevenue / totalPatients)
            : 0}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  summaryBox: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
});
