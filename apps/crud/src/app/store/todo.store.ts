import { ComponentStore } from '@ngrx/component-store';
import { TodoConfig } from '../core/Interface/todo';
import { Injectable } from '@angular/core';
interface ToDOState {
  todos: TodoConfig[] | [];
  localSpinnerState: boolean;
  globalSpinnerState: boolean;
}

const initialState: ToDOState = {
  todos: [],
  localSpinnerState: false,
  globalSpinnerState: false,
};

@Injectable({
  providedIn: 'root',
})
export class ToDoStore extends ComponentStore<ToDOState> {
  constructor() {
    super(initialState);
  }
  loadToDos = this.updater((state, todos: TodoConfig[] | null) => ({
    ...state,
    todos: todos || [],
  }));
  updateTodoState = this.updater((state, todo: TodoConfig) => ({
    ...state,
    todos: state.todos.map((toDoObj: TodoConfig) => {
      if (toDoObj.id === todo.id) {
        return { ...toDoObj, title: todo.title };
      }
      return toDoObj;
    }),
  }));
  deleteOneTodoState = this.updater((state, id: number) => ({
    ...state,
    todos: state.todos.filter((item: TodoConfig) => {
      return id !== item.id;
    }),
  }));
  setGlobalLoaderFlag = this.updater((state, flag: boolean) => ({
    ...state,
    globalSpinnerState: flag,
  }));
  setLocalSpinnerFlag = this.updater((state, flag: boolean) => ({
    ...state,
    localSpinnerState: flag,
  }));
}
