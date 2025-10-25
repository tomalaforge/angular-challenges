import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Student } from '../model/student.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  http = inject(FakeHttpService);

  students = rxResource({
    stream: () => this.http.fetchStudents$,
    defaultValue: [],
  });

  addAll(students: Student[]) {
    this.students.set(students);
  }

  addOne(student: Student) {
    this.students.set([...this.students.value(), student]);
  }

  deleteOne(id: number) {
    this.students.set(this.students.value().filter((s) => s.id !== id));
  }
}
