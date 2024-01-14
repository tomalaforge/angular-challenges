import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodoItem } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoHttpService {
  TODO_REQ_URL = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodoList() {
    return this.http.get<TodoItem[]>(this.TODO_REQ_URL);
  }

  updateTodoItem(item: TodoItem) {
    const body = {
      todo: item.id,
      title: randText(),
      body: item.body,
      userId: item.userId,
    };

    return this.http.put<TodoItem>(
      `${this.TODO_REQ_URL}/${item.id}`,
      JSON.stringify(body),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteTodoItem(id: number) {
    return this.http.delete<void>(`${this.TODO_REQ_URL}/${id}`);
  }
}
