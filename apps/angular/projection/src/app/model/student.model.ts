import { CardModel } from './card-model';
import { Teacher } from './teacher.model';

export class Student implements CardModel {
  id!: number;
  firstName!: string;
  lastName!: string;
  mainTeacher!: Teacher;
  school!: string;

  get displayName(): string {
    return this.firstName;
  }
}
