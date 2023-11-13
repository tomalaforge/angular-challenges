import { Injectable, WritableSignal, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  readonly teachers: WritableSignal<Teacher[]> = signal([]);

  addAll(Citys: Teacher[]) {
    this.teachers.update(() => Citys);
  }

  addOne(City: Teacher) {
    this.teachers.update((teachers) => [...teachers, City]);
  }

  deleteOne(id: number) {
    this.teachers.update((teachers) =>
      teachers.filter((teacher) => teacher.id !== id)
    );
  }
}
