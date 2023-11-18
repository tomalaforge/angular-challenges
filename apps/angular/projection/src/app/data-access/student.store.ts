import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  public students = signal<Student[]>([]);

  public addAll(students: Student[]) {
    this.students.set(students);
  }

  public addOne(student: Student) {
    this.students.update((students) => [...students, student]);
  }

  public deleteOne(id: number) {
    this.students.update((students) => students.filter((t) => t.id !== id));
  }
}
