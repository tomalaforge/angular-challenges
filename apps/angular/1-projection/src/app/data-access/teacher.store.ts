import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore implements Store<Teacher> {
  private teachers = signal<Teacher[]>([]);

  getItems = () => this.teachers;

  addAll(teachers: Teacher[]) {
    this.teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachers.set([...this.teachers(), teacher]);
  }

  deleteOne(id: number) {
    this.teachers.set(this.teachers().filter((t) => t.id !== id));
  }
}
