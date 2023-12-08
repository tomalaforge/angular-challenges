import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { take, tap } from 'rxjs';
import { Student } from '../model/student.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private readonly _http = inject(FakeHttpService);
  private readonly destroyRef$ = inject(DestroyRef);

  private readonly _students = signal<Student[]>([]);

  students = this._students.asReadonly();

  constructor() {
    this.init();
  }

  init(): void {
    this._http.fetchStudents$
      .pipe(
        tap((students) => this.addAll(students)),
        take(1),
        takeUntilDestroyed(this.destroyRef$),
      )
      .subscribe();
  }

  addAll(students: Student[]) {
    this._students.set(students);
  }

  addOne(student: Student) {
    this._students.update((cities) => [...cities, student]);
  }

  deleteOne(id: number) {
    this._students.update((cities) => cities.filter((s) => s.id !== id));
  }
}
