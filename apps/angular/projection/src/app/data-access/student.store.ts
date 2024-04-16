import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { DataStoreBase } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends DataStoreBase<Student> {}
