import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Student } from '../model/student.model';
import { FakeHttpService, randStudent } from './fake-http.service';

@Injectable()
export class StudentStore {
  private readonly http = inject(FakeHttpService);
  private readonly _students = signal<Student[]>([]);

  public readonly students = this._students.asReadonly();

  fetchStudents = toSignal(
    this.http.fetchStudents$.pipe(
      tap((students) => this._students.set(students)),
    ),
  );

  addAll(students: Student[]) {
    this._students.set(students);
  }

  addOne() {
    this._students.update((students) => [...students, randStudent()]);
  }

  deleteOne(id: number) {
    this._students.set(this._students().filter((s) => s.id !== id));
  }
}
