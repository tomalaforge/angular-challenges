import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllData(): Observable<Task[]> {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<Task[]>(url);
  }

  putEntity(entity: Task): Observable<Task> {
    const url = 'https://jsonplaceholder.typicode.com/todos/' + entity.id;
    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8',
    );
    return this.http.put<Task>(url, entity, { headers });
  }

  delEntity(entity: Task): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/todos/' + entity.id;
    return this.http.delete<Task>(url, entity);
  }
}
