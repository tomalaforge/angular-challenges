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
    <ng-container *ngIf="callState$ | async as callState">
      <mat-spinner *ngIf="callState === 'Loading'; else loaded"></mat-spinner>
      <ng-template #loaded>
        <ng-container *ngIf="callState === 'Loaded'">
          <app-item
            *ngFor="let todo of todos$ | async; trackBy: trackByFunc"
            [item]="todo"
            [disabledTodosIds]="disabledTodosIds$ | async"
            [errorTodosIds]="errorTodosIds$ | async"
            (updateClicked)="handleUpdate($event)"
            (deleteClicked)="handleDelete($event)">
          </app-item>
        </ng-container>
        <ng-container *ngIf="callState !== 'Loaded' && callState !== 'Loading'">
          {{ callState.err }}
        </ng-container>
      </ng-template>
    </ng-container>
  `,
  styles: [],
  providers: [TodosStore],
})
export class AppComponent implements OnInit {
  public todos$ = this.todosStore.select((state) => state.todos);
  public callState$ = this.todosStore.select((state) => state.callstate);
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
