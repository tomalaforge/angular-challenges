import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { Todo } from '../types/todo';
import { TodoService } from '../services/todo.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <app-todo-item
      *ngFor="let todo of todosList$ | async"
      [todo]="todo"
      (updateTodo)="onTodoUpdate($event)"
      (deleteTodo)="onTodoDelete($event)"></app-todo-item>
  `,
  styles: [],
  imports: [CommonModule, TodoItemComponent],
  providers: [TodoService],
})
export class AppComponent implements OnInit {
  private readonly todoService = inject(TodoService);
  private readonly destroyRef = inject(DestroyRef);

  todosList$!: Observable<Todo[]>;

  ngOnInit(): void {
    this.todoService
      .initTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.todosList$ = this.todoService.todoList$;
  }

  onTodoUpdate(todo: Todo) {
    this.todoService
      .updateTodo(todo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  onTodoDelete(todo: Todo) {
    this.todoService
      .deleteTodo(todo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
