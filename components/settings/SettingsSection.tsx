import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

// Define icon type locally
type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface Props {
  title: string;
  items: { icon: IconName; label: string; color: string }[];
}

export default function SettingsSection({ title, items }: Props) {
  const { resolvedTheme } = useContext(AppThemeContext);
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
        {title}
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        {items.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.settingItem,
              {
                backgroundColor: pressed
                  ? isDark
                    ? "#334155"
                    : "#f9fafb"
                  : "transparent",
              },
            ]}
            onPress={() =>
              Alert.alert(item.label, "Feature coming soon 🚀")
            }
          >
            <View style={styles.row}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: `${item.color}20` },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={item.color}
                />
              </View>

              <Text style={[styles.text, { color: colors.text }]}>
                {item.label}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.subText}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  title: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
  card: { borderRadius: 18, borderWidth: 1, overflow: "hidden" },
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
