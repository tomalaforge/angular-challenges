import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class StudentStore implements Store<Student> {
  private students = signal<Student[]>([]);

  getItems = () => this.students;

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
