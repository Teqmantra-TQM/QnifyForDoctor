import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

export default function AppearanceSection() {
  const { themeMode, setThemeMode, resolvedTheme } =
    useContext(AppThemeContext);

  const isDark = resolvedTheme === "dark";

  const colors = {
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#f1f5f9" : "#111827",
    subText: isDark ? "#94a3b8" : "#6b7280",
    border: isDark ? "#334155" : "#e5e7eb",
  };

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: colors.subText }]}>
        Appearance
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.settingItem}>
          <View style={styles.row}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? "#334155" : "#eef2ff" },
              ]}
            >
              <Ionicons
                name={isDark ? "moon" : "sunny"}
                size={20}
                color={isDark ? "#facc15" : "#f97316"}
              />
            </View>

            <Text style={[styles.text, { color: colors.text }]}>
              Dark Mode
            </Text>
          </View>

          <Switch
            value={themeMode === "dark"}
            onValueChange={(value) =>
              setThemeMode(value ? "dark" : "light")
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  title: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
  card: { borderRadius: 18, borderWidth: 1 },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  row: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  text: { fontSize: 14, fontWeight: "600" },
});
