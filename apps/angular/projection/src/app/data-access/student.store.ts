import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private students = new BehaviorSubject<Student[]>([]);

  public students$ = this.students.asObservable();

  public addAll(students: Student[]): void {
    this.students.next(students);
  }

  public addOne(student: Student): void {
    this.students.next([...this.students.value, student]);
  }

  public deleteOne(id: number): void {
    this.students.next(
      this.students.value.filter((s: Student): boolean => s.id !== id),
    );
  }
}
