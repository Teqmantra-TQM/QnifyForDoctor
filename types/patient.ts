export type PatientStatus = "waiting" | "completed";

export interface Patient {
  id: string;
  name: string;
  age: number;
  reason: string;
  arrivalTime: Date;
  status: PatientStatus;
  queueNumber: number;
}
