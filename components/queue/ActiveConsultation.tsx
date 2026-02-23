import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Patient } from "../../app/(tabs)/queue";
import { AppThemeContext } from "../../context/AppThemeContext";

interface Props {
  patient: Patient | null;
  onComplete: () => void;
}

export default function ActiveConsultation({ patient, onComplete }: Props) {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const theme = {
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#ffffff" : "#111827",
    subText: isDark ? "#94a3b8" : "#6b7280",
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      {patient ? (
        <>
          <Text style={[styles.title, { color: theme.text }]}>
            Currently Serving
          </Text>
          <Text style={[styles.name, { color: theme.text }]}>
            {patient.name}
          </Text>
          <Text style={{ color: theme.subText }}>{patient.reason}</Text>

          <Pressable style={styles.button} onPress={onComplete}>
            <Text style={{ color: "#fff" }}>Mark Complete</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Ionicons name="person-outline" size={40} color={theme.subText} />
          <Text style={{ marginTop: 10, color: theme.text }}>
            No Active Consultation
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 16, marginBottom: 16, alignItems: "center" },
  title: { fontWeight: "700", marginBottom: 6 },
  name: { fontSize: 18, fontWeight: "700" },
  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
});
