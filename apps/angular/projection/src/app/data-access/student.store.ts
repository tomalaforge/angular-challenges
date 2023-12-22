import { Injectable, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Student } from '../model/student.model';
import { ShareStore } from './share.store';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends ShareStore<Student> {
  constructor() {
    super();
    const _students = toSignal(this.http.fetchStudents$, { initialValue: [] });
    effect(() => this.addAll(_students()), { allowSignalWrites: true });
  }
}
