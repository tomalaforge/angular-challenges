import { ComponentStore } from '@ngrx/component-store';
import { TodoConfig } from '../core/Interface/todo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface ToDOState {
  todos: TodoConfig[] | [];
  localSpinnerState: boolean;
  globalSpinnerState: boolean;
  error?: string;
  complete?: string;
}

const initialState: ToDOState = {
  todos: [],
  localSpinnerState: false,
  globalSpinnerState: false,
  error: '',
  complete: '',
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
  getGlobalLoaderFlag$: Observable<boolean> = this.select(
    (state) => state.globalSpinnerState
  );
  setLocalSpinnerFlag = this.updater((state, flag: boolean) => ({
    ...state,
    localSpinnerState: flag,
  }));
  getLocalSpinnerFlag$: Observable<boolean> = this.select(
    (state) => state.localSpinnerState
  );

  setComplete = this.updater((state, message: string) => ({
    ...state,
    complete: message,
  }));
  setError = this.updater((state, error: string) => ({
    ...state,
    error: error,
  }));
}
