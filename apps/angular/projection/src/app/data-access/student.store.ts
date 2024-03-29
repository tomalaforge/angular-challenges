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
    this.students.update((prevStudents) => [...prevStudents, student]);
  }

  deleteOne(id: number) {
    this.students.update((prevStudents) =>
      prevStudents.filter((student) => student.id !== id),
    );
  }
}
