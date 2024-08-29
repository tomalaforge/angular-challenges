export interface TODO {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  isUpdating?: boolean;
}
