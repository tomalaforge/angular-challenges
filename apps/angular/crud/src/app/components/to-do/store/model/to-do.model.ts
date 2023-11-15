import { ComponentFeature } from '../../../../shared/model/component.model';

export interface ToDoState extends ComponentFeature {
  todo: ToDoItem[] | [],
};

export interface ToDoItem {
    userId: number,
    id: number,
    title: string,
    completed: boolean
  }
  