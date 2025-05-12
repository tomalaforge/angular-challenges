import { effect, inject, Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private readonly http = inject(FakeHttpService);
  readonly teachers = signal<Teacher[]>([]);

  constructor() {
    effect(() => {
      this.http.fetchTeachers$.subscribe((t) => this.addAll(t));
    });
  }

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
