export interface Task {
  id: string;
  text: string;
  description: string;
  dueDate: string; // "YYYY-MM-DD", "" if not set
  dueTime: string; // "HH:MM", "" if not set
  createdAt: string; // ISO string
  completed: boolean; // completed = closed
  archived: boolean;
}

export type View = "open" | "closed" | "archived";