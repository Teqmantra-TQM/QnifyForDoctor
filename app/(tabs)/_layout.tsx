import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

export default function TabLayout() {
  const pathname = usePathname();
  const { resolvedTheme } = useContext(AppThemeContext);

  const isDark = resolvedTheme === "dark";

  const getTitle = () => {
    if (pathname.includes("queue")) return "Queue Management";
    if (pathname.includes("schedule")) return "Schedule";
    if (pathname.includes("settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <View style={{ flex: 1 }}>
      {/*Custom Top Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            borderColor: isDark ? "#1e293b" : "#e5e7eb",
          },
        ]}
      >
        <View style={styles.iconBox}>
          <Ionicons name="medical" size={22} color="#fff" />
        </View>

        <View>
          <Text
            style={[
              styles.headerTitle,
              { color: isDark ? "#ffffff" : "#111827" },
            ]}
          >
            {getTitle()}
          </Text>

          <Text
            style={[
              styles.headerSubtitle,
              { color: isDark ? "#94a3b8" : "#6b7280" },
            ]}
          >
            Dr. Portal · Live Dashboard
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            borderTopColor: isDark ? "#1e293b" : "#e5e7eb",
          },
          tabBarActiveTintColor: "#4f46e5",
          tabBarInactiveTintColor: isDark ? "#94a3b8" : "#6b7280",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="queue"
          options={{
            title: "Queue",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});
