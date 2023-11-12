import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoApplication } from '../../core/application/todo.application';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoItemComponent } from './components/todo-item.component';
import { Todo } from '../../core/entity/todo.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, TodoItemComponent],
  template: `<ng-container>
    <app-todo-item
      *ngFor="let todo of todos$ | async"
      [todo]="todo"
      (onUpdateTodo)="update($event)" />
  </ng-container>`,
  styles: [``],
  standalone: true,
})
export class TodosComponent {
  private todoApplication: TodoApplication = inject(TodoApplication);

  readonly todos$ = this.todoApplication.todos$;

  update(todo: Todo) {
    this.todoApplication.update(todo);
  }
}
