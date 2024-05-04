import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  readonly students = signal<Student[]>([]);

  addAll(students: Student[]) {
    this.students.set(students);
  }

  addOne(student: Student) {
    this.students.update((s) => [...s, student]);
  }

  deleteOne(id: number) {
    this.students.update((s) => s.filter((s) => s.id !== id));
  }
}
