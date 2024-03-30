import { Injectable, signal, WritableSignal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  teachers: WritableSignal<Teacher[]> = signal<Teacher[]>([]);

  addAll(teachers: Teacher[]) {
    this.teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachers.update((teachers) => [...teachers, teacher]);
  }

  deleteOne(id: number) {
    this.teachers.update((teachers) => teachers.filter((val) => val.id !== id));
  }
}
