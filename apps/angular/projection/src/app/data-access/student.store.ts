import { Injectable, WritableSignal, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  readonly students: WritableSignal<Student[]> = signal([]);

  addAll(Citys: Student[]) {
    this.students.update(() => Citys);
  }

  addOne(Student: Student) {
    this.students.update((students) => [...students, Student]);
  }

  deleteOne(id: number) {
    this.students.update((students) =>
      students.filter((student) => student.id !== id)
    );
  }
}
