import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appointment } from "../../app/(tabs)/schedule";
import { AppThemeContext } from "../../context/AppThemeContext";

interface Props {
  appointments: Appointment[];
}

export default function AppointmentList({ appointments }: Props) {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const theme = {
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#ffffff" : "#111827",
    subText: isDark ? "#94a3b8" : "#6b7280",
    border: isDark ? "#334155" : "#e5e7eb",
    completed: isDark ? "#334155" : "#f3f4f6",
    upcoming: isDark ? "#1e3a8a" : "#eef2ff",
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Appointments
      </Text>

      {appointments.map((appointment) => (
        <View
          key={appointment.id}
          style={[
            styles.appointmentCard,
            {
              backgroundColor:
                appointment.status === "completed"
                  ? theme.completed
                  : theme.upcoming,
              borderColor: theme.border,
            },
            appointment.status === "upcoming" && {
              borderWidth: 1,
            },
          ]}
        >
          <View style={styles.rowBetween}>
            <Text style={[styles.timeText, { color: theme.text }]}>
              {appointment.time}
            </Text>

            {appointment.status === "upcoming" && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Upcoming</Text>
              </View>
            )}
          </View>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Ionicons name="person" size={14} color={theme.subText} />
              <Text style={[styles.detailText, { color: theme.subText }]}>
                {appointment.patient}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="location" size={14} color={theme.subText} />
              <Text style={[styles.detailText, { color: theme.subText }]}>
                {appointment.type}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 14,
  },
  appointmentCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: "#f59e0b",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  details: {
    marginTop: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 13,
  },
});
