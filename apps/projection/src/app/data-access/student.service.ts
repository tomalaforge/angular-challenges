import { inject, Injectable } from '@angular/core';
import { StudentStore } from './student.store';
import { delay, Observable, of, tap } from 'rxjs';
import { Student } from '../model';
import { randStudent, students } from './fake.data';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentStore = inject(StudentStore);

  loadData(): Observable<Student[]> {
    return of(students).pipe(
      delay(500),
      tap((students) => this.studentStore.addAll(students))
    );
  }

  addStudent() {
    this.studentStore.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.studentStore.deleteOne(id);
  }
}
