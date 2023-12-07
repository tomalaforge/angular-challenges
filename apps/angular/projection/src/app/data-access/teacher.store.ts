import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService } from './fake-http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private readonly _http = inject(FakeHttpService);
  private readonly _destroyRef$ = inject(DestroyRef);

  private readonly _teachers$ = new BehaviorSubject<Teacher[]>([]);

  readonly teachers$ = this._teachers$.asObservable();

  constructor() {
    this.init();
  }

  init(): void {
    this._http.fetchTeachers$
      .pipe(
        tap((teachers) => this.addAll(teachers)),
        take(1),
        takeUntilDestroyed(this._destroyRef$),
      )
      .subscribe();
  }

  addAll(teachers: Teacher[]) {
    this._teachers$.next(teachers);
  }

  addOne(teacher: Teacher) {
    this._teachers$.next([...this._teachers$.value, teacher]);
  }

  deleteOne(id: number) {
    this._teachers$.next(this._teachers$.value.filter((t) => t.id !== id));
  }
}
