import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  cities = signal<Teacher[]>([]);

  addAll(cities: Teacher[]) {
    this.cities.set(cities);
  }

  addOne(student: Teacher) {
    this.cities.update((x) => [...x, student]);
  }

  deleteOne(id: number) {
    this.cities.update((x) => x.filter((x) => x.id !== id));
  }
}
