import { Item } from './item.model';
import { Teacher } from './teacher.model';

export interface Student extends Item {
  firstName: string;
  lastName: string;
  mainTeacher: Teacher;
  school: string;
}
