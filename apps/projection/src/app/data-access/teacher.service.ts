import { inject, Injectable } from '@angular/core';
import { TeacherStore } from './teacher.store';
import { delay, Observable, of, tap } from 'rxjs';
import { Teacher } from '../model';
import { randTeacher, teachers } from './fake.data';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  teacherStore = inject(TeacherStore);

  loadData(): Observable<Teacher[]> {
    return of(teachers).pipe(
      delay(500),
      tap((teachers) => this.teacherStore.addAll(teachers))
    );
  }

  addTeacher() {
    this.teacherStore.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.teacherStore.deleteOne(id);
  }
}
