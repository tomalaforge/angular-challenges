import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService, randTeacher } from './fake-http.service';

@Injectable()
export class TeacherStore {
  private readonly http = inject(FakeHttpService);
  private readonly _teachers = signal<Teacher[]>([]);

  public readonly teachers = this._teachers.asReadonly();

  fetchTeachers = toSignal(
    this.http.fetchTeachers$.pipe(
      tap(() => console.log('fetchTeachers')),
      tap((teachers) => this._teachers.set(teachers)),
    ),
  );

  addOne() {
    this._teachers.update((teachers) => [...teachers, randTeacher()]);
  }

  deleteOne(id: number) {
    this._teachers.set(this._teachers().filter((t) => t.id !== id));
  }
}
