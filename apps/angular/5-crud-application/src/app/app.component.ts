import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './model/todo';
import { TodoService } from './services/todo.service';

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
  todos: = signal<Todo[]>([]);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.todos.set(todos);
    });
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((updatedTodo: Todo) => {
      // Use map to create a new list without mutating the original array
      const updatedList = this.todos().map((item) =>
        item.id === updatedTodo.id ? {...updatedTodo} : item
      );
      // Set the new list as the updated todo list
      this.todos.set(updatedList);
    });

  }
}
