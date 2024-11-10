import { computed, Injectable } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { DataStore } from './data.store';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore extends DataStore<Teacher> {
  constructor() {
    super();
  }

  teachers = computed(() => this.entries());
}
