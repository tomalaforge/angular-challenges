export interface Todo {
  id: number;
  completed: boolean;
  title: string;
  userId: number;
  disabled: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
}
