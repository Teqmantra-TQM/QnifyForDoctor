import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { AppThemeContext } from "../../context/AppThemeContext";

import ActiveConsultation from "../../components/queue/ActiveConsultation";
import AddPatientModal from "../../components/queue/AddPatientModal";
import QueueStats from "../../components/queue/QueueStats";
import WaitingQueue from "../../components/queue/WaitingQueue";

export type Patient = {
  id: string;
  name: string;
  age: number;
  reason: string;
};

export default function Queue() {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const theme = {
    background: isDark ? "#0f172a" : "#f3f4f6",
  };

  const [waitingPatients, setWaitingPatients] = useState<Patient[]>([
    { id: "1", name: "Sarah Johnson", age: 45, reason: "Regular checkup" },
    { id: "2", name: "Michael Smith", age: 32, reason: "Fever & cold" },
    { id: "3", name: "Aarav Sharma", age: 28, reason: "Stomach pain" },
    { id: "4", name: "Priya Verma", age: 37, reason: "Headache & dizziness" },
    { id: "5", name: "David Lee", age: 50, reason: "BP follow-up" },
    { id: "6", name: "Sneha Patel", age: 24, reason: "Skin allergy" },
    { id: "7", name: "Rahul Mehta", age: 41, reason: "Diabetes review" },
  ]);

  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const averageWaitTime = waitingPatients.length * 5;

  const handleCallNext = () => {
    if (waitingPatients.length === 0) return;

    const [next, ...rest] = waitingPatients;
    setCurrentPatient(next);
    setWaitingPatients(rest);
  };

  const handleComplete = () => {
    setCurrentPatient(null);
    setCompletedCount((prev) => prev + 1);
  };

  const handleRemove = (id: string) => {
    setWaitingPatients((prev) =>
      prev.filter((patient) => patient.id !== id)
    );
  };

  const handleAdd = (patient: Patient) => {
    setWaitingPatients((prev) => [...prev, patient]);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <QueueStats
          waitingCount={waitingPatients.length}
          completedCount={completedCount}
          averageWaitTime={averageWaitTime}
        />

        <ActiveConsultation
          patient={currentPatient}
          onComplete={handleComplete}
        />

        <WaitingQueue
          patients={waitingPatients}
          onCallNext={handleCallNext}
          onRemove={handleRemove}
        />
      </ScrollView>

      <Pressable
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>

      <AddPatientModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  onAdd={handleAdd}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#2563eb",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
