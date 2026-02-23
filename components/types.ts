export interface Patient {
  id: string;
  name: string;
  age: number;
  reason: string;
  arrivalTime: Date;
  status: 'waiting' | 'current' | 'completed';
  queueNumber: number;
}
