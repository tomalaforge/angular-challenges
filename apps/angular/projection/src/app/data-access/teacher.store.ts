import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private teachersSubject = new BehaviorSubject<Teacher[]>([]);
  teachers = toSignal(this.teachersSubject.asObservable());

  addAll(teachers: Teacher[]) {
    this.teachersSubject.next(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachersSubject.next([...this.teachersSubject.value, teacher]);
  }

  deleteOne(id: number) {
    this.teachersSubject.next(
      this.teachersSubject.value.filter((t) => t.id !== id),
    );
  }
}
