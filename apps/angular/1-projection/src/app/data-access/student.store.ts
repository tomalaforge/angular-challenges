import { effect, inject, Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private readonly http = inject(FakeHttpService);
  public students = signal<Student[]>([]);

  constructor() {
    effect(() => {
      this.http.fetchStudents$.subscribe((s) => this.addAll(s));
    });
  }

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
