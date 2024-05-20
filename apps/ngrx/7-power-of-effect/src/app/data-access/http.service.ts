import { FakeBackendService } from '@angular-challenges/power-of-effect/backend';
import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private fakeBackend = inject(FakeBackendService);

  getAllTeachers = () => this.fakeBackend.getAllTeachers().pipe(take(1));

  getAllStudents = () => this.fakeBackend.getAllStudents().pipe(take(1));

  getAllSchools = () => this.fakeBackend.getAllSchools().pipe(take(1));
}
