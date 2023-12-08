import { Teacher } from './teacher.model';

export class Student {
  id!: number;
  firstname!: string;
  lastname!: string;
  mainTeacher!: Teacher;
  school!: string;
}
