import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  waitingCount: number;
  completedCount: number;
  averageWaitTime: number;
}

export default function QueueStats({
  waitingCount,
  completedCount,
  averageWaitTime,
}: Props) {
  const total = waitingCount + completedCount;

  const cards = [
    {
      label: "Waiting",
      value: waitingCount,
      icon: "people",
      colors: ["#2563eb", "#1d4ed8"] as const,
    },
    {
      label: "Completed",
      value: completedCount,
      icon: "checkmark-circle",
      colors: ["#16a34a", "#15803d"] as const,
    },
    {
      label: "Avg Wait",
      value: `${averageWaitTime}m`,
      icon: "time",
      colors: ["#f97316", "#ea580c"] as const,
    },
    {
      label: "Total Today",
      value: total,
      icon: "calendar",
      colors: ["#7c3aed", "#6d28d9"] as const,
    },
  ];

  return (
    <View style={styles.grid}>
      {cards.map((item, index) => (
        <LinearGradient
          key={index}
          colors={item.colors}
          style={styles.card}
        >
          <Ionicons name={item.icon as any} size={20} color="#fff" />
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </LinearGradient>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  card: { width: "48%", padding: 16, borderRadius: 16 },
  label: { color: "#fff", fontSize: 12, marginTop: 6 },
  value: { color: "#fff", fontSize: 22, fontWeight: "bold", marginTop: 4 },
});
