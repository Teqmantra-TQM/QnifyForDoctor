import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

import AppearanceSection from "../../components/settings/AppearanceSection";
import LogoutButton from "../../components/settings/LogoutButton";
import ProfileCard from "../../components/settings/ProfileCard";
import SettingsSection from "../../components/settings/SettingsSection";

// Define once only
type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface SettingsItem {
  icon: IconName;
  label: string;
  color: string;
}

export default function Settings() {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const colors = {
    background: isDark ? "#0f172a" : "#f3f4f6",
    subText: isDark ? "#94a3b8" : "#6b7280",
  };

  // Explicitly typed sections
  const sections: { title: string; items: SettingsItem[] }[] = [
    {
      title: "Account",
      items: [
        { icon: "person", label: "Profile Settings", color: "#6366f1" },
        { icon: "notifications", label: "Notifications", color: "#ec4899" },
        { icon: "shield-checkmark", label: "Privacy & Security", color: "#16a34a" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: "color-palette", label: "Appearance", color: "#f97316" },
        { icon: "settings", label: "General Settings", color: "#06b6d4" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: "help-circle", label: "Help & Support", color: "#6366f1" },
      ],
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <ProfileCard />
      <AppearanceSection />

      {sections.map((section, index) => (
        <SettingsSection
          key={index}
          title={section.title}
          items={section.items}
        />
      ))}

      <LogoutButton />

      <Text style={[styles.versionText, { color: colors.subText }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  versionText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
  },
});
