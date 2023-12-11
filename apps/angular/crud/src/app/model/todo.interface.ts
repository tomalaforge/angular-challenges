import { Status } from './status.interface';

export interface Todo extends Status {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
