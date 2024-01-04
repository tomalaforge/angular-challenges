import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../model/student.model';
import { randStudent } from './fake-http.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends Store {
  constructor() {
    super(new BehaviorSubject<Student[]>([]));
  }

  override randItem() {
    return randStudent();
  }
}
