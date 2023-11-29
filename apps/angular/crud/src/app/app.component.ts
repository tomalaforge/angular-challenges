import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  effect,
  inject,
} from '@angular/core';
import { TodoService } from './service/todo.service';
import { TodoComponent } from './component/todo.component';

@Component({
  standalone: true,
  imports: [CommonModule, TodoComponent],
  selector: 'app-root',
  template: `
    @for (todo of todoService.todoList(); track $index) {
      <app-todo [todo]="todo" />
    }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  todoService: TodoService = inject(TodoService);

  constructor() {
    effect(() => {
      if (this.todoService.todoError() !== '') {
        console.error(this.todoService.todoError());
      }
    });
  }

  ngOnInit(): void {
    this.todoService.callTodoList();
  }
}
