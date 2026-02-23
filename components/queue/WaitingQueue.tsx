import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Patient } from "../../app/(tabs)/queue";
import { AppThemeContext } from "../../context/AppThemeContext";

interface Props {
  patients: Patient[];
  onCallNext: () => void;
  onRemove: (id: string) => void;
}

export default function WaitingQueue({
  patients,
  onCallNext,
  onRemove,
}: Props) {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const theme = {
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#ffffff" : "#111827",
    subText: isDark ? "#94a3b8" : "#6b7280",
    queueItem: isDark ? "#0f172a" : "#f9fafb",
    highlight: isDark ? "#312e81" : "#fff7ed",
    border: isDark ? "#334155" : "#e5e7eb",
    button: "#2563eb",
    buttonDisabled: "#94a3b8",
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      {/* Header */}
      <View style={styles.rowBetween}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Waiting Queue
        </Text>

        <Pressable
          style={[
            styles.callBtn,
            {
              backgroundColor:
                patients.length === 0
                  ? theme.buttonDisabled
                  : theme.button,
            },
          ]}
          onPress={onCallNext}
          disabled={patients.length === 0}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Call Next
          </Text>
        </Pressable>
      </View>

      {/* Empty State */}
      {patients.length === 0 && (
        <Text
          style={{
            color: theme.subText,
            textAlign: "center",
            marginTop: 12,
          }}
        >
          No patients waiting 🎉
        </Text>
      )}

      {/* Patient List */}
      {patients.map((patient, index) => (
        <View
          key={patient.id}
          style={[
            styles.queueItem,
            {
              backgroundColor:
                index === 0 ? theme.highlight : theme.queueItem,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.left}>
            {/* Queue Number Badge */}
            <View style={styles.badge}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                {index + 1}
              </Text>
            </View>

            {/* Patient Info */}
            <View>
              <Text style={[styles.name, { color: theme.text }]}>
                {patient.name}
              </Text>

              <Text style={[styles.subText, { color: theme.subText }]}>
                Age: {patient.age}
              </Text>

              <Text style={[styles.subText, { color: theme.subText }]}>
                {patient.reason}
              </Text>
            </View>
          </View>

          {/* Remove Button */}
          <Pressable onPress={() => onRemove(patient.id)}>
            <Ionicons name="close-circle" size={22} color="#ef4444" />
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
  callBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  queueItem: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#f59e0b",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: "700",
    fontSize: 14,
  },
  subText: {
    fontSize: 12,
    marginTop: 2,
  },
});
