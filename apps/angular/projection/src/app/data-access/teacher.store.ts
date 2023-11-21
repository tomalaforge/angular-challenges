import { Injectable } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore extends BaseStore<Teacher> {}
