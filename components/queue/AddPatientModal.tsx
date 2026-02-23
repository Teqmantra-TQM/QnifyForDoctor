import { useContext, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Patient } from "../../app/(tabs)/queue";
import { AppThemeContext } from "../../context/AppThemeContext";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (patient: Patient) => void;
}

export default function AddPatientModal({
  visible,
  onClose,
  onAdd,
}: Props) {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [reason, setReason] = useState("");

  const theme = {
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#ffffff" : "#111827",
    subText: isDark ? "#94a3b8" : "#6b7280",
    border: isDark ? "#334155" : "#e5e7eb",
  };

  const handleSubmit = () => {
    if (!name || !age || !reason) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const newPatient: Patient = {
      id: Date.now().toString(),
      name,
      age: Number(age),
      reason,
    };

    onAdd(newPatient);

    setName("");
    setAge("");
    setReason("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.card },
          ]}
        >
          <Text style={[styles.title, { color: theme.text }]}>
            Add Patient
          </Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor={theme.subText}
            style={[
              styles.input,
              { borderColor: theme.border, color: theme.text },
            ]}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Age"
            keyboardType="numeric"
            placeholderTextColor={theme.subText}
            style={[
              styles.input,
              { borderColor: theme.border, color: theme.text },
            ]}
            value={age}
            onChangeText={setAge}
          />

          <TextInput
            placeholder="Reason"
            placeholderTextColor={theme.subText}
            style={[
              styles.input,
              { borderColor: theme.border, color: theme.text },
            ]}
            value={reason}
            onChangeText={setReason}
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Add
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
});
