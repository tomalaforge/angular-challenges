export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UpdatedTodo {
  todo: number;
  title: string;
  id: number;
}
