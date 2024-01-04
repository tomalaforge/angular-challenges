import { Injectable, computed, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private _students = signal<Student[]>([]);
  students = computed(this._students);

  addAll(students: Student[]) {
    this._students.set(students);
  }

  addOne(student: Student) {
    this._students.update((value) => [...value, student]);
  }

  deleteOne(id: number) {
    this._students.update((value) => value.filter((t) => t.id !== id));
  }
}
