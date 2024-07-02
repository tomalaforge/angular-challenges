import { Teacher } from './teacher.model';

export interface Student {
  id: number;
  firstname: string;
  lastname: string;
  mainTeacher: Teacher;
  school: string;
}
