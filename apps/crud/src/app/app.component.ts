/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LetModule } from '@ngrx/component';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { CallState, ErrorState, Todo, TodoService } from './todo.service';

type TodoItem = {
  todo: Todo;
  callState: CallState;
};

@Component({
  selector: 'todo-item',
  imports: [
    CommonModule,
    LetModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  standalone: true,
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div *ngIf="vm?.error">
        <p>{{ vm?.error?.message }}</p>
        <button mat-button color="warn" (click)="deleteTodo$(vm?.todo)">
          Retry
        </button>
      </div>

      <mat-spinner *ngIf="vm?.callState === 'LOADING'" [diameter]="40">
      </mat-spinner>

      <ng-container *ngIf="vm?.callState === 'LOADED'">
        <div *ngrxLet="vm.todo as todo">
          {{ todo.title }}
          <button
            mat-stroked-button
            color="primary"
            (click)="updateTodo$(todo)">
            Update
          </button>
          <button mat-stroked-button color="warn" (click)="deleteTodo$(todo)">
            Delete
          </button>
        </div>
      </ng-container>
    </ng-container>
  `,
  providers: [ComponentStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class TodoItemComponent extends ComponentStore<TodoItem> {
  readonly vm$ = this.select({
    todo: this.select((state) => state.todo),
    callState: this.select((state) => state.callState),
    error: this.select(({ callState }) => {
      if ((callState as ErrorState).error !== undefined) {
        return (callState as ErrorState).error;
      }
      return null;
    }),
  }).pipe(tap(console.log));

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {
    super({
      todo: {} as Todo,
      callState: 'INIT',
    });
  }

  @Input()
  set todoItem(todo: Todo) {
    this.patchState({
      todo,
      callState: 'LOADED',
    });
  }

  readonly updateTodo$ = this.effect((todo: Observable<Todo>) => {
    return todo.pipe(
      tap(() => this.showLoading()),
      switchMap((todo) =>
        this.todoService.updateTodo$(todo).pipe(
          tapResponse(
            () => {
              // no need update the state,
              // because its already updated and we listen via input
            },
            (error: Error) => {
              this.handleError(error);
            }
          )
        )
      )
    );
  });

  readonly deleteTodo$ = this.effect((todo: Observable<Todo>) => {
    return todo.pipe(
      tap(() => this.showLoading()),
      switchMap((todo) =>
        this.todoService.deleteTodo$(todo).pipe(
          tapResponse(
            () => {
              // no need remove todo,
              // because its already removed and we listen via input
              // if we want to show popup to user
              // we can do it here
              this.snackBar.open('Successfully Deleted', 'ok');
            },
            (error: Error) => {
              this.handleError(error);
            }
          )
        )
      )
    );
  });

  private handleError = (error: Error) => {
    this.patchState({ callState: { error } });
  };

  private showLoading = () => {
    this.patchState({ callState: 'LOADING' });
  };
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
      <mat-spinner *ngIf="vm?.callState === 'LOADING'" [diameter]="40">
      </mat-spinner>

      <ng-container *ngIf="vm?.callState === 'LOADED'">
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
