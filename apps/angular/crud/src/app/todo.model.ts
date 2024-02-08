export interface todo {
  userId: number;
  id: number;
  title: string;
  body?: string;
  completed?: boolean;
}

export interface todostate {
  todos: todo[];
}

export interface appModel {
  todos: todo[];
  // isError: string | null;  //optional
  isLoading: boolean;
}
