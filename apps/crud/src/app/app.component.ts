import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Todo, TodosService} from './todos.service';
import {concatMap, map, startWith, Subject} from 'rxjs';
import {RxState} from '@rx-angular/state';
import {ForModule, LetModule} from '@rx-angular/template';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {IfModule} from '@rx-angular/template/experimental/if';
import {MatSnackBar} from '@angular/material/snack-bar';
import {createErrorHandler} from './error-handler';

type TodoUi = Todo & {
  isLoading: boolean;
};

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ForModule,
    MatProgressSpinnerModule,
    IfModule,
    LetModule,
  ],
  selector: 'app-root',
  template: `
    <mat-spinner *rxIf="isLoading$; else todosTemplate"></mat-spinner>
    <ng-template #todosTemplate>
      <div *rxFor="let todo of todos$; let index = index">
        {{ todo.title }}
        <button (click)="updatesSubject.next(todo)" [disabled]="todo.isLoading">
          Update
        </button>
        <button
          (click)="deleteSubject.next({todo, index})"
          [disabled]="todo.isLoading">
          X
        </button>
      </div>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState, MatSnackBar],
})
export class AppComponent {
  todos$ = this.state.select('todos');
  isLoading$ = this.state.select('isLoading');
  addSubject = new Subject<{ todo: Todo; index: number }>();
  updatesSubject = new Subject<Todo>();
  deleteSubject = new Subject<{ todo: Todo; index: number }>();

  private errorHandler = createErrorHandler();

  private initHandler$ = this.todosService.getTodos().pipe(
    map((todos) => ({
      todos: todos.map((todo) => ({ ...todo, isLoading: false })),
      isLoading: false,
    })),
    startWith({ todos: [], isLoading: true })
  );

  private updateHandler$ = this.updatesSubject.pipe(
    concatMap((todo) =>
      this.todosService.update(todo).pipe(
        map((updatedTodo) => ({ ...updatedTodo, isLoading: false })),
        startWith({ ...todo, isLoading: true }),
        this.errorHandler()
      )
    )
  );

  private deleteHandler$ = this.deleteSubject.pipe(
    concatMap(({ todo, index }) => {
      return this.todosService.delete(todo.id).pipe(
        startWith(todo),
        this.errorHandler(),
        map((value) => {
          if (!value) {
            this.addSubject.next({ todo, index });
          }
          return value;
        })
      );
    })
  );

  constructor(
    private state: RxState<{
      todos: TodoUi[];
      isLoading: boolean;
    }>,
    private todosService: TodosService
  ) {
    this.state.connect(this.initHandler$);
    this.state.connect('todos', this.addSubject, (state, { todo, index }) => [
      ...state.todos.slice(0, index),
      { ...todo, isLoading: false },
      ...state.todos.slice(index),
    ]);
    this.state.connect('todos', this.updateHandler$, (state, updatedTodo) =>
      updatedTodo
        ? [
          ...state.todos.map((t) =>
            t.id === updatedTodo.id ? updatedTodo : t
          ),
        ]
        : state.todos);
    this.state.connect('todos', this.deleteHandler$, (state, deletedTodo) =>
      deletedTodo
        ? state.todos.filter((todo) => todo.id !== deletedTodo.id)
        : state.todos
    );
  }
}
