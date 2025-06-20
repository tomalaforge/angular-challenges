import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Store } from '../model/store.model';
import { Student } from '../model/student.model';
import { FakeHttpService, randStudent } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private readonly _http = inject(FakeHttpService);
  private readonly _state: Store<Student, '$students'> = {
    $students: signal<Student[]>([]),
  };

  $fetchStudents = toSignal(
    this._http.fetchStudents$.pipe(
      tap((t: Student[]) => this._state.$students.set(t)),
    ),
  );

  readonly $students = this._state.$students.asReadonly();

  addOne() {
    this._state.$students.update((t: Student[]) => [...t, randStudent()]);
  }

  deleteOne(id: number) {
    this._state.$students.set(
      this.$students().filter((t: Student) => t.id !== id),
    );
  }
}
