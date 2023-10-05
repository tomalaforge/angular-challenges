import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../interfaces/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }

  // normally you need to pass a payload - i.e. form group value
  // in this case, it is faked
  // only title will change with random text from falso package
  // if you delete headers -> won't work -> text will just disappear
  // the update discards the other properties of the todo object
  // to save all other properties -> need to pass todo object
  updateTodo(id: number) {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      JSON.stringify({
        id: id,
        title: randText(),
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  }

  deleteTodo(id: number) {
    return this.http.delete<void>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }
}
