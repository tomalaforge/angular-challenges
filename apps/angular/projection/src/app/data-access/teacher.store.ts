import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { take, tap } from 'rxjs';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService } from './fake-http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private readonly _http = inject(FakeHttpService);
  private readonly _destroyRef$ = inject(DestroyRef);

  private readonly _teachers = signal<Teacher[]>([]);

  teachers = this._teachers.asReadonly();

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
    this._teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this._teachers.update((cities) => [...cities, teacher]);
  }

  deleteOne(id: number) {
    this._teachers.update((cities) => cities.filter((t) => t.id !== id));
  }
}
