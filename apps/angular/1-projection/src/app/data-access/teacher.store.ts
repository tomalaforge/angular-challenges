import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  http = inject(FakeHttpService);

  teachers = rxResource({
    stream: () => this.http.fetchTeachers$,
    defaultValue: [],
  });

  addAll(teachers: Teacher[]) {
    this.teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachers.set([...this.teachers.value(), teacher]);
  }

  deleteOne(id: number) {
    this.teachers.set(this.teachers.value().filter((t) => t.id !== id));
  }
}
