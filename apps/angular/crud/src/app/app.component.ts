import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodoItem } from '../models/todo';
import { TodoHttpService } from './todo-http.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = signal<TodoItem[]>([]);

  constructor(private todoHttpService: TodoHttpService) {}

  ngOnInit(): void {
    this.todoHttpService.getTodoList().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(todo: TodoItem) {
    const body = {
      todo: todo.id,
      title: randText(),
      body: todo.body,
      userId: todo.userId,
    };

    this.todoHttpService
      .updateTodoItem(todo.id, body)
      .subscribe((todoUpdated: TodoItem) => {
        this.todos.update((value: TodoItem[]) => {
          return value.splice(todoUpdated.id - 1, 1, todoUpdated);
        });
      });
  }
}
