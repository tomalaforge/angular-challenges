import { Teacher } from './teacher.model';
import { BaseEntity } from './base-entity.model';

export interface Student extends BaseEntity {
  lastname: string;
  mainTeacher: Teacher;
  school: string;
}
