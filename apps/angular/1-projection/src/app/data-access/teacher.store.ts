import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Store } from '../model/store.model';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService, randTeacher } from './fake-http.service';

@Injectable()
export class TeacherStore {
  private readonly _http = inject(FakeHttpService);
  private readonly _state: Store<Teacher, '$teachers'> = {
    $teachers: signal<Teacher[]>([]),
  };

  $fetchTeachers = toSignal(
    this._http.fetchTeachers$.pipe(
      tap((t: Teacher[]) => this._state.$teachers.set(t)),
    ),
  );

  readonly $teachers = this._state.$teachers.asReadonly();

  addOne() {
    this._state.$teachers.update((t: Teacher[]) => [...t, randTeacher()]);
  }

  deleteOne(id: number) {
    this._state.$teachers.set(
      this.$teachers().filter((t: Teacher) => t.id !== id),
    );
  }
}
