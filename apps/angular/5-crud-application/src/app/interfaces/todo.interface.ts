export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoUpdate {
  title: string;
  completed: boolean;
}
