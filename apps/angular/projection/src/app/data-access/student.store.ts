import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private _students = signal<Student[]>([]);
  students = this._students.asReadonly();

  addAll(students: Student[]) {
    this._students.set(students);
  }

  addOne(student: Student) {
    this._students.update((value) => [...value, student]);
  }

  deleteOne(id: number) {
    this._students.update((value) => value.filter((s) => s.id !== id));
  }
}
