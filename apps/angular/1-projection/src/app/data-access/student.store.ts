import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Student } from '../model/student.model';
import { FakeHttpService, randStudent } from './fake-http.service';

interface Store {
  $students: WritableSignal<Student[]>;
}

@Injectable()
export class StudentStore {
  private readonly _http = inject(FakeHttpService);
  private readonly _store: Store = {
    $students: signal<Student[]>([]),
  };

  $fetchTeachers = toSignal(
    this._http.fetchStudents$.pipe(
      tap((t: Student[]) => this._store.$students.set(t)),
    ),
  );

  readonly $students = this._store.$students.asReadonly();

  addOne(): void {
    this._store.$students.update((s: Student[]) => [...s, randStudent()]);
  }

  deleteOne(id: number): void {
    this._store.$students.set(
      this.$students().filter((t: Student) => t.id !== id),
    );
  }
}
