import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  #students = signal<Student[]>([]);

  get students() {
    return this.#students.asReadonly();
  }

  addAll(students: Student[]) {
    this.#students.set(students);
  }

  addOne(student: Student) {
    this.#students.set(this.students().concat(student));
  }

  deleteOne(id: number) {
    this.#students.set(this.#students().filter((st) => st.id !== id));
  }
}
