import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

export default function RecentActivity() {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const recentActivity = [
    { name: "Sarah Johnson", status: "Completed", time: "10 mins ago" },
    { name: "Michael Chen", status: "Checked In", time: "25 mins ago" },
    { name: "Emily Rodriguez", status: "Cancelled", time: "1 hour ago" },
    { name: "David Park", status: "Completed", time: "2 hours ago" },
  ];

  const theme = {
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#ffffff" : "#111827",
    subText: isDark ? "#94a3b8" : "#6b7280",
    border: isDark ? "#334155" : "#e5e7eb",
  };

  const getStatusColor = (status: string) => {
    if (status === "Completed") return isDark ? "#4ade80" : "#16a34a";
    if (status === "Cancelled") return isDark ? "#f87171" : "#dc2626";
    if (status === "Checked In") return isDark ? "#60a5fa" : "#2563eb";
    return theme.subText;
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Recent Activity
      </Text>

      {recentActivity.map((item, index) => (
        <View
          key={index}
          style={[
            styles.activityRow,
            { borderColor: theme.border },
          ]}
        >
          <View>
            <Text
              style={{ fontWeight: "600", color: theme.text }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: getStatusColor(item.status),
              }}
            >
              {item.status}
            </Text>
          </View>

          <Text
            style={{ fontSize: 12, color: theme.subText }}
          >
            {item.time}
          </Text>
        </View>
      ))}
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
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
});
