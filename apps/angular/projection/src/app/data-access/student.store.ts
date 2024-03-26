import { Injectable, computed, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  #students = signal<Student[]>([]);
  students = computed(this.#students);

  addAll(students: Student[]) {
    this.#students.update((_) => [...students]);
  }

  addOne(students: Student) {
    this.#students.update((oldStudents) => [...oldStudents, students]);
  }

  deleteOne(id: number) {
    this.#students.update((oldStudents) =>
      oldStudents.filter((student) => student.id !== id),
    );
  }
}
