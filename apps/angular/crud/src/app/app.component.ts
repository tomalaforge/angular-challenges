import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TODO } from './app.service';
import {
  deleteTodoAction,
  getAllTodosAction,
  updateTodoAction,
} from './store/app.actions';
import { isError, isLoading, selectAllTodos } from './store/app.selectors';

// import { GetAllTodoActions } from './store/app.actions';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (isError$ | async) {
      <p class="error">{{ isError$ | async }}</p>
    }
    @if (isLoading$ | async) {
      <mat-spinner></mat-spinner>
    }
    <div *ngFor="let todo of todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos$!: Observable<TODO[]>;
  isError$!: Observable<string>;
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<{ todos: TODO[] }>) {}

  ngOnInit(): void {
    this.todos$ = this.store.select(selectAllTodos);
    this.isLoading$ = this.store.select(isLoading);
    this.isError$ = this.store.select(isError);
    this.store.dispatch(getAllTodosAction({ loading: true }));

    // --------another way to dispatch actions----------
    // this.store.dispatch(
    //   new GetAllTodoActions(this.payloadData),
    // );
  }

  update(todo: TODO) {
    this.store.dispatch(updateTodoAction({ todo: todo, loading: true }));
  }
  delete(id: number) {
    this.store.dispatch(deleteTodoAction({ id: id, loading: true }));
  }
}
