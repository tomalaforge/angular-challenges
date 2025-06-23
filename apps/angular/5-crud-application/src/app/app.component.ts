import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { randText, Todo } from '@ngneat/falso';
import { AppService } from '../services/app.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div style="display: flex; flex-direction: column; padding: 12px; gap:8px">
      @for (todo of todos; track todo.id) {
        <div>
          {{ todo.title }}
          <button (click)="update(todo)">Update</button>
          <button (click)="delete(todo)">Delete</button>
        </div>
      }
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(
    private appService: AppService,
    private http: HttpClient,
  ) {}

  todos!: any[];

  ngOnInit(): void {
    this.appService.getTodos();
    this.appService.todosBehavior.subscribe((todos) => {
      this.todos = todos;
    });
  }

  update(todo: Todo) {
    const updatedTodo: Todo = {
      id: todo.id,
      title: randText(),
      completed: false,
    };

    this.appService.updateTodo(todo.id, updatedTodo);
  }
  delete(todo: Todo) {
    this.appService.deleteTodo(todo.id);
  }
}
