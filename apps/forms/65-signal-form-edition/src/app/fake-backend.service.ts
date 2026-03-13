import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class FakeBackendService {
  private users: User[] = [
    { id: 1, firstname: 'Max', lastname: 'Mustermann', age: 30, grade: 10 },
    { id: 2, firstname: 'John', lastname: 'Doe', age: 25, grade: 8 },
    { id: 3, firstname: 'Jane', lastname: 'Smith', age: 28, grade: 9 },
  ];

  getUsers(): Observable<User[]> {
    return of([...this.users]).pipe(delay(500));
  }

  getUser(id: number): Observable<User | undefined> {
    return of(this.users.find((u) => u.id === id)).pipe(delay(500));
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    const newUser = {
      ...user,
      id: Math.max(...this.users.map((u) => u.id), 0) + 1,
    };
    this.users.push(newUser);
    return of(newUser).pipe(delay(500));
  }

  updateUser(user: User): Observable<User> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
    return of(user).pipe(delay(500));
  }

  deleteUser(id: number): Observable<void> {
    this.users = this.users.filter((u) => u.id !== id);
    return of(undefined).pipe(delay(500));
  }
}
