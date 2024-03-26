import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { Student } from '../model/student.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  constructor(private http: FakeHttpService) {
    this.http.fetchStudents$.subscribe((c) => this.addAll(c));
  }

  private students: WritableSignal<Student[]> = signal([]);
  students$: Signal<Student[]> = computed(() => this.students());

  addAll(students: Student[]) {
    this.students.set(students);
  }

  addOne(student: Student) {
    this.students.update((students) => [...students, student]);
  }

  deleteOne(id: number) {
    this.students.update((students) => students.filter((s) => s.id !== id));
  }
}
