import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface ScreenHeaderProps {
  title: string;
}

export default function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        {/*  Doctor-related icon */}
        <Ionicons name="person-circle" size={22} color="#fff" />
      </View>

      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Dr. Portal · Live Dashboard</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#e5e7eb",
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

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
});
