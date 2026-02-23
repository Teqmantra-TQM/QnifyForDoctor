import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

interface Props {
  waitingCount: number;
  completedCount: number;
}

export default function AppointmentsCard({
  waitingCount,
  completedCount,
}: Props) {
  const router = useRouter();
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const cancelledToday = 2;

  const theme = {
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#ffffff" : "#111827",
    subText: isDark ? "#94a3b8" : "#6b7280",
    waitingBg: isDark ? "#312e81" : "#e0e7ff",
    doneBg: isDark ? "#064e3b" : "#d1fae5",
    cancelledBg: isDark ? "#7f1d1d" : "#fee2e2",
    doneText: isDark ? "#bbf7d0" : "#065f46",
    cancelledText: isDark ? "#fecaca" : "#991b1b",
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.rowBetween}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Appointments
        </Text>

        <Pressable
          style={styles.queueButton}
          onPress={() => router.push("/queue")}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            View Queue →
          </Text>
        </Pressable>
      </View>

      <View style={styles.appointmentRow}>
        {/* Waiting */}
        <View
          style={[
            styles.statusBox,
            { backgroundColor: theme.waitingBg },
          ]}
        >
          <Text style={[styles.statusLabel, { color: theme.subText }]}>
            Waiting
          </Text>
          <Text style={[styles.statusValue, { color: theme.text }]}>
            {waitingCount}
          </Text>
        </View>

        {/* Done */}
        <View
          style={[
            styles.statusBox,
            { backgroundColor: theme.doneBg },
          ]}
        >
          <Text
            style={[styles.statusLabel, { color: theme.doneText }]}
          >
            Done
          </Text>
          <Text
            style={[styles.statusValue, { color: theme.doneText }]}
          >
            {completedCount}
          </Text>
        </View>

        {/* Cancelled */}
        <View
          style={[
            styles.statusBox,
            { backgroundColor: theme.cancelledBg },
          ]}
        >
          <Text
            style={[styles.statusLabel, { color: theme.cancelledText }]}
          >
            Cancelled
          </Text>
          <Text
            style={[styles.statusValue, { color: theme.cancelledText }]}
          >
            {cancelledToday}
          </Text>
        </View>
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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  queueButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  appointmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  statusBox: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    marginRight: 6,
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 12,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
