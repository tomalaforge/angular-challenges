import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Student } from '../model/student.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private readonly _http = inject(FakeHttpService);
  private readonly destroyRef$ = inject(DestroyRef);

  private readonly _students$ = new BehaviorSubject<Student[]>([]);

  students$ = this._students$.asObservable();

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
    this._students$.next(students);
  }

  addOne(student: Student) {
    this._students$.next([...this._students$.value, student]);
  }

  deleteOne(id: number) {
    this._students$.next(this._students$.value.filter((s) => s.id !== id));
  }
}
