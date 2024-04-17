import { ITodoStore } from '../../interfaces/ITodoStore';

export const baseTodoState: ITodoStore = {
  list: [],
  errorMessage: '',
  ITodo: {
    userId: 0,
    id: 0,
    title: '',
    body: '',
    completed: false,
  },
};
