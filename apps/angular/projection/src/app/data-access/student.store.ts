import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends BaseStore<Student> {}
