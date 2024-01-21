export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  body?: string;
}
