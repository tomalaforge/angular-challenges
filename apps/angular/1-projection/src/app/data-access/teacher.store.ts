import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService, randTeacher } from './fake-http.service';

interface Store {
  $teachers: WritableSignal<Teacher[]>;
}

@Injectable()
export class TeacherStore {
  private readonly _http = inject(FakeHttpService);
  private readonly _state: Store = {
    $teachers: signal<Teacher[]>([]),
  };

  $fetchTeachers = toSignal(
    this._http.fetchTeachers$.pipe(
      tap((t: Teacher[]) => this._state.$teachers.set(t)),
    ),
  );

  readonly $teachers = this._state.$teachers.asReadonly();

  addOne(): void {
    this._state.$teachers.update((t: Teacher[]) => [...t, randTeacher()]);
  }

  deleteOne(id: number): void {
    this._state.$teachers.set(
      this.$teachers().filter((t: Teacher) => t.id !== id),
    );
  }
}
