import { CardItem } from './card.model';
import { Teacher } from './teacher.model';

export interface Student extends CardItem {
  id: number;
  firstName: string;
  lastName: string;
  mainTeacher: Teacher;
  school: string;
}
