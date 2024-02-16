import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  getAllTodos() {
    return this.http.get<TODO[]>('https://jsonplaceholder.typicode.com/todos');
  }

  update(todo: TODO) {
    return this.http.put<TODO>(
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
    );
  }

  delete(id: number) {
    return this.http.delete<number>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
  }
}

export interface TODO {
  userId: number;
  id: number;
  title: string;
  body?: string;
  completed?: boolean;
}
