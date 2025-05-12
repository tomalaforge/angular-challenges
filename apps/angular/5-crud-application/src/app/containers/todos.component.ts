import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Todo } from '../_interfaces/todo.interface';
import {
  deleteTodoActions,
  loadTodosActions,
  todosFeature,
  updateTodoActions,
} from '../_store';
import { ItemComponent } from '../components/item.component';
import { GlobalLoadingIndicatorComponent } from '../components/loading-indicator.component';

@Component({
  selector: 'app-todos',
  imports: [
    AsyncPipe,
    MatProgressSpinnerModule,
    ItemComponent,
    GlobalLoadingIndicatorComponent,
  ],
  template: `
    <app-global-loading-indicator [loading]="loadingTodoList$ | async" />
    @for (todo of todos$ | async; track todo.id) {
      <app-item
        [loadingAction]="isActionInCurse(todo.id) | async"
        (update)="updateTodo(todo)"
        (delete)="deleteTodo(todo)">
        {{ todo.title }}
      </app-item>
    }
  `,
})
export class TodosComponent implements OnInit {
  loadingTodoList$!: Observable<boolean>;
  todos$!: Observable<Todo[]>;

  readonly store = inject(Store);

  ngOnInit() {
    this.loadingTodoList$ = this.store.select(todosFeature.selectLoadingTodos);

    this.store.dispatch(loadTodosActions.load());
    this.todos$ = this.store.select(todosFeature.selectAll);
  }

  isActionInCurse(id: number): Observable<boolean> {
    return this.store.select((state) =>
      todosFeature.selectLoadingTodoIds(state).includes(id),
    );
  }

  updateTodo(todo: Todo) {
    this.store.dispatch(
      updateTodoActions.update({
        update: { id: todo.id, changes: { title: randText() } },
      }),
    );
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(deleteTodoActions.delete({ todo }));
    this.todos$ = this.todos$.pipe(
      map((todos) => todos.filter((t) => t.id !== todo.id)),
    );
  }
}
