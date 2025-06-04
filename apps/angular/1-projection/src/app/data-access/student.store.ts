import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { BaseDataAccessStore } from './_lib/base-service-data-access-store';

@Injectable()
export class StudentStore extends BaseDataAccessStore<Student> {}
