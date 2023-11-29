import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Todo } from './model/todo.interface';
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
  styles: [],
})
export class AppComponent implements OnInit {
  todoService: TodoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.callTodoList();
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo);
  }
}
