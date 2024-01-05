import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from '../model/teacher.model';
import { randTeacher } from './fake-http.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore extends Store<Teacher> {
  constructor() {
    super(new BehaviorSubject<Teacher[]>([]));
  }

  override randItem() {
    return randTeacher();
  }
}
