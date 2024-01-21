import { Task } from '../../model/task';

export interface TaskStoreModel {
  list: Task[];
  errorMessage: string;
  task: Task;
}
