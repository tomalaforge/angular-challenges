import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  public teachers = signal<Teacher[]>([]);

  public addAll(teachers: Teacher[]) {
    this.teachers.set(teachers);
  }

  public addOne(teacher: Teacher) {
    this.teachers.update((teachers) => [...teachers, teacher]);
  }

  public deleteOne(id: number) {
    this.teachers.update((teachers) => teachers.filter((t) => t.id !== id));
  }
}
