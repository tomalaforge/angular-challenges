import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodosStore } from './data-access/todos.store';
import { Todo } from './model/todo.interface';
import { ItemComponent } from './components/item.component';
@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ItemComponent],
  selector: 'app-root',
  template: `
    <mat-spinner *ngIf="loading$ | async; else loaded"></mat-spinner>
    <ng-template #loaded>
      <ng-container *ngIf="error$ | async as error; else result">
        {{ error }}
      </ng-container>
      <ng-template #result>
        <app-item
          *ngFor="let todo of todos$ | async; trackBy: trackByFunc"
          [item]="todo"
          [disabledTodosIds]="disabledTodosIds$ | async"
          [errorTodosIds]="errorTodosIds$ | async"
          (updateClicked)="handleUpdate($event)"
          (deleteClicked)="handleDelete($event)">
        </app-item>
      </ng-template>
    </ng-template>
  `,
  styles: [],
  providers: [TodosStore],
})
export class AppComponent implements OnInit {
  public todos$ = this.todosStore.select((state) => state.todos);
  public loading$ = this.todosStore.select((state) => state.loading);
  public error$ = this.todosStore.select((state) => state.error);
  public disabledTodosIds$ = this.todosStore.select(
    (state) => state.disabledTodosIds
  );
  public errorTodosIds$ = this.todosStore.select(
    (state) => state.errorTodosIds
  );

  constructor(private readonly todosStore: TodosStore) {}

  ngOnInit(): void {
    this.todosStore.load();
  }

  trackByFunc(_: number, item: Todo): number {
    return item.id;
  }

  handleUpdate(todo: Todo): void {
    this.todosStore.update(todo);
  }

  handleDelete(todo: Todo): void {
    this.todosStore.delete(todo.id);
  }
}
