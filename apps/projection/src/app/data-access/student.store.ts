import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../model/student.model';
import { Store } from './store.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentStore implements Store<Student> {
  private students = new BehaviorSubject<Student[]>([]);
  students$ = this.students.asObservable();

  addAll(students: Student[]) {
    this.students.next(students);
  }

  addOne(student: Student) {
    this.students.next([...this.students.value, student]);
  }

  deleteOne(id: number) {
    this.students.next(this.students.value.filter((s) => s.id !== id));
  }
}
