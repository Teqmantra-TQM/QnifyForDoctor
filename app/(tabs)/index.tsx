import { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

import AppointmentsCard from "../../components/dashboard/AppointmentsCard";
import BottomActions from "../../components/dashboard/BottomActions";
import FinanceSummary from "../../components/dashboard/FinanceSummary";
import HeaderCard from "../../components/dashboard/HeaderCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import RevenueCards from "../../components/dashboard/RevenueCards";

export default function Dashboard() {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f3f4f6" },
      ]}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <HeaderCard waitingCount={3} completedCount={0} />
      <RevenueCards />
      <AppointmentsCard waitingCount={3} completedCount={0} />
      <FinanceSummary waitingCount={3} completedCount={0} />
      <RecentActivity />
      <BottomActions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
