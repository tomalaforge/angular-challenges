import { Injectable } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore extends CrudService<Teacher> {
  teachers = this.ressources;
}
