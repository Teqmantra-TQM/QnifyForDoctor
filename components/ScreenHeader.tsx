import { StyleSheet, Text, View } from "react-native";

interface ScreenHeaderProps {
  title: string;
}

export default function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {/* <Text style={styles.subtitle}>Live Dashboard</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderColor: "#e5e5e5",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    letterSpacing: 0.3,
  },

  subtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});