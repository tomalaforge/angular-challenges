import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../model/student.model';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  cities = signal<Student[]>([]);

  addAll(cities: Student[]) {
    this.cities.set(cities);
  }

  addOne(student: Student) {
    this.cities.update(x => [...x, student]);
  }

  deleteOne(id: number) {
    this.cities.update(x => x.filter(x => x.id !== id));
  }
}
