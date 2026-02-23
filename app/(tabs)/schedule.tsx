import { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

import AppointmentList from "../../components/schedule/AppointmentList";
import ScheduleHeader from "../../components/schedule/ScheduleHeader";

export type Appointment = {
  id: number;
  time: string;
  patient: string;
  type: string;
  status: "completed" | "upcoming";
};

export default function Schedule() {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const theme = {
    background: isDark ? "#0f172a" : "#f3f4f6",
  };

  const appointments: Appointment[] = [
    { id: 1, time: "09:00 AM", patient: "John Doe", type: "General Checkup", status: "completed" },
    { id: 2, time: "10:30 AM", patient: "Jane Smith", type: "Follow-up", status: "completed" },
    { id: 3, time: "02:00 PM", patient: "Robert Brown", type: "Consultation", status: "upcoming" },
    { id: 4, time: "03:30 PM", patient: "Maria Garcia", type: "Lab Review", status: "upcoming" },
    { id: 5, time: "04:45 PM", patient: "James Wilson", type: "General Checkup", status: "upcoming" },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <ScheduleHeader appointments={appointments} />
      <AppointmentList appointments={appointments} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
