import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private students = signal<Student[]>([]);

  public get students$() {
    return this.students;
  }

  addAll(students: Student[]) {
    this.students.set(students);
  }

  addOne(student: Student) {
    this.students.update(() => this.students().concat(student));
  }

  deleteOne(id: number) {
    this.students.update(() => this.students().filter((s) => s.id !== id));
  }
}
