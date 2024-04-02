import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  data = signal<Teacher[]>([]);

  addAll(data: Teacher[]) {
    this.data.set(data);
  }

  addOne(item: Teacher) {
    this.data.update((values) => [...values, item]);
  }

  deleteOne(id: number) {
    const newData = this.data().filter((t) => t.id !== id);

    this.data.set(newData);
  }
}
