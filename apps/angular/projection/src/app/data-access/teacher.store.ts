import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  constructor(private http: FakeHttpService) {
    this.http.fetchTeachers$.subscribe((t) => this.addAll(t));
  }

  private teachers: WritableSignal<Teacher[]> = signal([]);
  teachers$: Signal<Teacher[]> = computed(() => this.teachers());

  addAll(teachers: Teacher[]) {
    this.teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachers.update((teachers) => [...teachers, teacher]);
  }

  deleteOne(id: number) {
    this.teachers.update((teachers) => teachers.filter((t) => t.id !== id));
  }
}
