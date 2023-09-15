export interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  body: string;
  isProcessing?: boolean;
  errorMessage?: string;
}
