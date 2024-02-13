import { Teacher } from './teacher.model';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  mainTeacher: Teacher;
  school: string;
}
