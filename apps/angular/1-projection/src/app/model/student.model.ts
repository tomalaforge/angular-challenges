import { IModel } from './base.model';
import { Teacher } from './teacher.model';

export interface Student extends IModel {
  firstName: string;
  lastName: string;
  mainTeacher: Teacher;
  school: string;
}
