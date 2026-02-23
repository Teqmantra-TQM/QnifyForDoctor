import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

export default function BottomActions() {
  const router = useRouter();
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const colors = {
    manage: isDark ? "#1d4ed8" : "#2563eb",
    schedule: isDark ? "#15803d" : "#16a34a",
    pressedDark: "#334155",
    pressedLight: "#e5e7eb",
  };

  return (
    <View style={styles.bottomActions}>
      <Pressable
        onPress={() => router.push("/queue")}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed
              ? isDark
                ? colors.pressedDark
                : colors.pressedLight
              : colors.manage,
          },
        ]}
      >
        <Ionicons name="people" size={18} color="#fff" />
        <Text style={styles.actionText}>Manage Queue</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/schedule")}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed
              ? isDark
                ? colors.pressedDark
                : colors.pressedLight
              : colors.schedule,
          },
        ]}
      >
        <Ionicons name="calendar" size={18} color="#fff" />
        <Text style={styles.actionText}>Schedule</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
});
