import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoService } from '../../data-access/todo.service';
import { LoadingService } from '../../data-access/loading.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Subscription, take } from 'rxjs';
import { TodoStore } from '../../data-access/todo.store';
import { ITodo } from '../../models/todo.model';
import { randText } from '@ngneat/falso';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TodoItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos',
  providers: [TodoStore],
  template: `
    <ng-container
      *ngIf="
        loadingService.isLoading$ | async as isLoading;
        else isLoadedTemplate
      ">
      <div class="spinner-container">
        <mat-spinner></mat-spinner>
      </div>
    </ng-container>

    <ng-template #isLoadedTemplate>
      <ng-container *ngIf="todos$ | async as todos">
        <app-todo-item
          (updateToDoEvent)="updateTodo($event)"
          (deleteToDoEvent)="deleteTodo($event)"
          *ngFor="let todo of todos; let i = index; trackBy: trackTodos"
          [todoItem]="todo">
        </app-todo-item>
      </ng-container>
    </ng-template>
  `,
  styles: [
    `
      .spinner-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class TodosComponent implements OnInit, OnDestroy {
  todoService = inject(TodoService);
  loadingService = inject(LoadingService);
  todoStore = inject(TodoStore);

  todos$ = this.todoStore.todos$;
  private _subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.todoService.get();
    const todoSub$ = this.todoService.todos$.subscribe((todos) => {
      this.todoStore.loadTodos(todos);
    });
    this._subscriptions.push(todoSub$);
  }

  updateTodo(todo: ITodo) {
    const updatedTodo = {
      ...todo,
      todo: todo.id,
      title: randText(),
      userId: todo.userId,
      disabled: false,
    };

    this.todos$.pipe(take(1)).subscribe((todos) => {
      const updatedTodos = todos.map((t) =>
        t.id === updatedTodo.id ? updatedTodo : t
      );
      this.todoStore.loadTodos(updatedTodos);
      const sub = this.todoService.update(updatedTodo);
      this._subscriptions.push(sub);
    });
  }

  deleteTodo(todo: ITodo) {
    this.todos$.pipe(take(1)).subscribe((todos) => {
      const updatedTodos = todos.filter((t) => t.id !== todo.id);
      this.todoStore.loadTodos(updatedTodos);
      const sub = this.todoService.delete(todo);
      this._subscriptions.push(sub);
    });
  }

  trackTodos(index: number, todo: ITodo) {
    return todo.id;
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
}
