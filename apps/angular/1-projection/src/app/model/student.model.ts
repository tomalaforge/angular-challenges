import { BaseItem } from './base.model';
import { Teacher } from './teacher.model';

export interface Student extends BaseItem {
  firstName: string;
  lastName: string;
  mainTeacher: Teacher;
  school: string;
}
