/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { LetModule } from '@ngrx/component';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { Todo, TodoService } from './todo.service';

type IodoItem = {
  todo: Todo;
  loading: boolean;
  error: Error | null;
};

@Component({
  selector: 'todo-item',
  imports: [CommonModule, LetModule, MatProgressSpinnerModule, MatButtonModule],
  standalone: true,
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <p *ngIf="vm?.error">{{ vm?.error?.message }}</p>

      <mat-spinner *ngIf="vm?.loading" [diameter]="40"> </mat-spinner>

      <ng-container *ngIf="!vm?.error && !vm?.loading">
        <div *ngrxLet="vm.todo as todo">
          {{ todo.title }}
          <button
            mat-stroked-button
            color="primary"
            (click)="updateTodo$(todo)">
            Update
          </button>
          <button
            mat-stroked-button
            color="warn"
            (click)="todoService.deleteTodo$(todo)">
            Delete
          </button>
        </div>
      </ng-container>
    </ng-container>
  `,
  providers: [ComponentStore],
  styles: [
    `
      :host {
        padding: 20px;
        display: flex;
        gap: 10px;
      }
    `,
  ],
})
export class TodoItemComponent extends ComponentStore<IodoItem> {
  readonly vm$ = this.select({
    todo: this.select((state) => state.todo),
    loading: this.select((state) => state.loading),
    error: this.select((state) => state.error),
  });

  constructor(public todoService: TodoService) {
    super({
      todo: {} as Todo,
      loading: false,
      error: null,
    });
  }

  @Input()
  set todoItem(todo: Todo) {
    this.patchState({
      todo,
      loading: false,
      error: null,
    });
  }

  readonly updateTodo$ = this.effect((todo: Observable<Todo>) => {
    return todo.pipe(
      tap(() => this.showLoading()),
      switchMap((todo) => this.todoService.updateTodo(todo)),
      tapResponse(
        (todo) => {
          this.setState({
            todo,
            loading: false,
            error: null,
          });
        },
        (error: Error) => {
          this.handleError(error);
        }
      )
    );
  });

  private showLoading = this.updater((state) => ({
    todo: state.todo,
    loading: true,
    error: null,
  }));

  private handleError = this.updater((state, error: Error) => ({
    todo: state.todo,
    error,
    loading: false,
  }));
}
@Component({
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    TodoItemComponent,
  ],
  standalone: true,
  selector: 'app-root',
  template: `
    <h2>Angular Crud Operation Solution</h2>

    <div *ngIf="vm$ | async as vm">
      <p *ngIf="vm?.error">{{ vm?.error?.message }}</p>

      <!-- Global Spinner -->
      <mat-spinner *ngIf="vm?.loading" [diameter]="40"> </mat-spinner>

      <ng-container *ngIf="!vm?.error && !vm?.loading">
        <ng-container *ngFor="let todo of vm?.todos">
          <todo-item [todoItem]="todo"></todo-item>
        </ng-container>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        padding: 20px;
      }
    `,
  ],
})
export class AppComponent {
  vm$ = this.todoService.vm$;

  constructor(private todoService: TodoService) {
    this.todoService.getTodos$();
  }
}
