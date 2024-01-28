import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private _teachers = signal<Teacher[]>([]);

  get teachers(): Teacher[] {
    return this._teachers();
  }

  addAll(teachers: Teacher[]) {
    this._teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this._teachers.set([...this._teachers(), teacher]);
  }

  deleteOne(id: number) {
    this._teachers.set(this._teachers().filter((t) => t.id !== id));
  }
}
