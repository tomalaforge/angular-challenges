import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends Store<Student> {}
