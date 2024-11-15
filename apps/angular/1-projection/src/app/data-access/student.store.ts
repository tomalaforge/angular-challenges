import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  students = signal<Student[]>([]);

  addAll(students: Student[]) {
    this.students.set(students);
  }

  addOne(student: Student) {
    this.students.set([...this.students(), student]);
  }

  deleteOne(id: number) {
    this.students.set(this.students().filter((s) => s.id !== id));
  }
}
