import { Entity } from './entity.model';
import { Teacher } from './teacher.model';

export interface Student extends Entity {
  firstname: string;
  lastname: string;
  mainTeacher: Teacher;
  school: string;
}
