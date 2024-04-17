import { Component, inject, Input } from '@angular/core';

import { randText } from '@ngneat/falso';
import { Store } from '@ngrx/store';
import { ITodo } from '../../interfaces/ITodo';
import { todoActions } from '../../states/todos/todo.actions';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input() todo!: ITodo;

  private store = inject(Store);
  public loaderService = inject(LoaderService);

  updateTodo(todo: ITodo) {
    const newTodo = { ...todo };
    newTodo.title = randText();
    this.store.dispatch(todoActions.updateTodoAction({ task: newTodo }));
  }

  deleteTodo(todo: ITodo) {
    this.store.dispatch(todoActions.deleteTodoAction({ task: todo }));
  }
}
