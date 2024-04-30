import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TodosService } from './app.service';

export interface Todo {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track $index) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="deleteTodo(todo)">Delete</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todosService = inject(TodosService);

  todos = this.todosService.todos;

  ngOnInit(): void {
    this.todosService.getTodos();
  }

  update(todo: Todo) {
    this.todosService.updateTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo);
  }
}
