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
    this._students.set([...this._students(), student]);
  }

  deleteOne(id: number) {
    this._students.set(
      this._students().filter((students) => students.id !== id),
    );
  }
}
