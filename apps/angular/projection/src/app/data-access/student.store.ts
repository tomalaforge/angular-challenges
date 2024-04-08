import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends CrudService<Student> {
  students = this.ressources;
}
