import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  update(todo: Todo) {
    console.log(todo);
    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          ...todo,
          title: randText(),
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: Todo) => {
        this.todos[todoUpdated.id - 1] = todoUpdated;
      });
  }
}
