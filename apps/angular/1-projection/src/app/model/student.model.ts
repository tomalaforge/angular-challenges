import { Id } from './id.model';
import { Teacher } from './teacher.model';

export interface Student extends Id {
  firstName: string;
  lastName: string;
  mainTeacher: Teacher;
  school: string;
}
