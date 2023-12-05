import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private _teachers = signal<Teacher[]>([]);
  teachers = this._teachers.asReadonly();

  addAll(teachers: Teacher[]) {
    this._teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this._teachers.update((value) => [...value, teacher]);
  }

  deleteOne(id: number) {
    this._teachers.update((value) => value.filter((t) => t.id !== id));
  }
}
