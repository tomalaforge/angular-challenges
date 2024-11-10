import { computed, Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { DataStore } from './data.store';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends DataStore<Student> {
  constructor() {
    super();
  }

  students = computed(() => this.entries());
}
