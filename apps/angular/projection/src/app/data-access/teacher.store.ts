import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private teachers = signal<Teacher[]>([]);

  public get teachers$() {
    return this.teachers;
  }

  addAll(data: Teacher[]) {
    this.teachers.set(data);
  }

  addOne(teacher: Teacher) {
    this.teachers.update(() => this.teachers().concat(teacher));
  }

  deleteOne(id: number) {
    this.teachers.update(() => this.teachers().filter((t) => t.id !== id));
  }
}
