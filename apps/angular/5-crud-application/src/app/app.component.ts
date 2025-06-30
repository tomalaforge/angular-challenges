import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    @for (todo of todos; track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);

  todos!: any[];

  ngOnInit(): void {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  update(todo: any) {
    this.http
      .put<any>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: any) => {
        this.todos[todoUpdated.id - 1] = todoUpdated;
      });
  }
}
