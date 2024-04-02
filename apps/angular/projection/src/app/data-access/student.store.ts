import { Injectable, signal, WritableSignal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  students: WritableSignal<Student[]> = signal<Student[]>([]);

  addAll(students: Student[]) {
    this.students.set(students);
  }

  addOne(student: Student) {
    this.students.update((students) => [...students, student]);
  }

  deleteOne(id: number) {
    this.students.update((students) => students.filter((s) => s.id !== id));
  }
}
