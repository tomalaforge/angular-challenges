import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  #teachers = signal<Teacher[]>([]);
  teachers = this.#teachers.asReadonly();

  addAll(teachers: Teacher[]) {
    this.#teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this.#teachers.update((t) => [...t, teacher]);
  }

  deleteOne(id: number) {
    this.#teachers.update((t) => t.filter((t) => t.id !== id));
  }
}
