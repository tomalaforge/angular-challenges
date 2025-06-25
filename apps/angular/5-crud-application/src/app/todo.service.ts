import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../model/todo';

const baseURI = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(`${baseURI}`);
  }

  updateTodo(id: number) {
    const updatedTodo = {
      id,
      title: randText(),
    };

    return this.http.put<Todo>(
      `${baseURI}/${id}`,
      JSON.stringify(updatedTodo),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteTodo(id: number) {
    return this.http.delete<void>(`${baseURI}/${id}`);
  }
}
