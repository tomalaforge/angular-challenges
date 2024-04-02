import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  data = signal<Student[]>([]);

  addAll(data: Student[]) {
    this.data.set(data);
  }

  addOne(item: Student) {
    this.data.update((values) => [...values, item]);
  }

  deleteOne(id: number) {
    const newData = this.data().filter((t) => t.id !== id);

    this.data.set(newData);
  }
}
