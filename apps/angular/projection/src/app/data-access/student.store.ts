import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students = toSignal(this.studentsSubject.asObservable());

  addAll(students: Student[]) {
    this.studentsSubject.next(students);
  }

  addOne(student: Student) {
    this.studentsSubject.next([...this.studentsSubject.value, student]);
  }

  deleteOne(id: number) {
    this.studentsSubject.next(
      this.studentsSubject.value.filter((s) => s.id !== id),
    );
  }
}
