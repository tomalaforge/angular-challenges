import { Injectable, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Teacher } from '../model/teacher.model';
import { ShareStore } from './share.store';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore extends ShareStore<Teacher> {
  constructor() {
    super();
    const _teachers = toSignal(this.http.fetchTeachers$, { initialValue: [] });
    effect(() => this.addAll(_teachers()), { allowSignalWrites: true });
  }
}
