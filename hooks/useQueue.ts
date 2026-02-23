import { Patient } from "@/types/patient";
import { useState } from "react";

export function useQueue() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [completedCount, setCompletedCount] = useState(0);

  const waitingPatients = patients.filter(p => p.status === "waiting");

  const callNext = () => {
    if (!waitingPatients.length) return;
    const next = waitingPatients[0];
    setCurrentPatient(next);
    setPatients(prev => prev.filter(p => p.id !== next.id));
  };

  const completeConsultation = () => {
    if (!currentPatient) return;
    setCompletedCount(c => c + 1);
    setCurrentPatient(null);
  };

  const addPatient = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
  };

  return {
    patients,
    waitingPatients,
    currentPatient,
    completedCount,
    callNext,
    completeConsultation,
    addPatient,
  };
}
