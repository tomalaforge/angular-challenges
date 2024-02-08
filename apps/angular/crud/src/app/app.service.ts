import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './appInterface.component';

@Injectable()
export class AppService {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  updateUser(todo: User): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/${todo.id}`,
      JSON.stringify({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }
}
