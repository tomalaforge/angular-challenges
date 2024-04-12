import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodosApiService {
  #http = inject(HttpClient);

  getTodoById$ = (todoId: number) =>
    this.#http.get<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    );

  getAllTodos$ = () =>
    this.#http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

  deleteTodo$ = (todoId: number) =>
    this.#http.delete<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    );

  updateTodo$ = (todo: Todo) =>
    this.#http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        body: todo.title,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
}
