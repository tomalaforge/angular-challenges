import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ITodo } from './models/todo.model';

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
  todos: ITodo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  update(todo: ITodo) {
    this.http
      .put<ITodo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      .subscribe((todoUpdated: ITodo) => {
        this.todos[todoUpdated.id - 1] = todoUpdated;
      });
  }
}
