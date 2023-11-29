import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Todo } from '../model/todo.interface';
import { TodoService } from '../service/todo.service';

@Component({
  standalone: true,
  selector: 'app-todo',
  template: `<div>
    {{ todo.title }}
    <button (click)="update(todo)">update</button>
    <button (click)="delete(todo.id)">delete</button>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo!: Todo;

  todoService: TodoService = inject(TodoService);

  update(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  delete(id: number) {
    this.todoService.deleteTodo(id);
  }
}
