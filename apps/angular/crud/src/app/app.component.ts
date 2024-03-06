import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Todo, UpdatedTodo } from './app.model';
import { TodoService } from './app.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Todo[];
  private http = inject(HttpClient);
  private todoService = inject(TodoService);

  constructor() {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  update(todo: Todo) {
    this.todoService
      .updateTodo(todo.id)
      .subscribe((todoUpdated: UpdatedTodo) => {
        this.todos = this.todos.map((t) => {
          if (t.id !== todo.id) {
            return t;
          } else {
            return {
              ...t,
              title: todoUpdated.title,
            };
          }
        });
      });
  }
}
