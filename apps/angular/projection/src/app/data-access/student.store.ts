import { Injectable } from '@angular/core';
import { AbstractStore } from './abstract.store';
import { Student } from '../model/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends AbstractStore<Student> {
  public get students$(): Observable<Student[]> {
    return this.entities$;
  }
}
