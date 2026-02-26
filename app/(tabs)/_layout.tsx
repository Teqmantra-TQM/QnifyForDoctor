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
      {/* ✅ Minimal Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark ? "#000" : "#fff",
            borderColor: isDark ? "#111" : "#e5e5e5",
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? "#fff" : "#000" },
          ]}
        >
          {getTitle()}
        </Text>

        <Text
          style={[
            styles.headerSubtitle,
            { color: isDark ? "#aaa" : "#666" },
          ]}
        >
          Live Dashboard
        </Text>
      </View>

      {/* Tabs */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDark ? "#000" : "#fff",
            borderTopColor: isDark ? "#111" : "#e5e5e5",
          },
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: isDark ? "#aaa" : "#666",
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});