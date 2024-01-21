import { TaskStoreModel } from './task.model';

export const taskBaseSate: TaskStoreModel = {
  list: [],
  errorMessage: '',
  task: {
    userId: 0,
    id: 0,
    title: '',
    completed: false,
    body: '',
  },
};
