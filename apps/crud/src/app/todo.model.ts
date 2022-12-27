export interface Todo {
  id: number;
  title: string;
}

export type WithError<T> = T & { error?: Error };
