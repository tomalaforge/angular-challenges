import { Injectable, computed, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  #teachers = signal<Teacher[]>([]);
  teachers = computed(this.#teachers);

  addAll(teachers: Teacher[]) {
    this.#teachers.update((_) => [...teachers]);
  }

  addOne(teachers: Teacher) {
    this.#teachers.update((oldTeachers) => [...oldTeachers, teachers]);
  }

  deleteOne(id: number) {
    this.#teachers.update((oldTeachers) =>
      oldTeachers.filter((teacher) => teacher.id !== id),
    );
  }
}
