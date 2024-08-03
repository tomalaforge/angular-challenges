import { Subject } from '../types';
import { Person } from './person.model';

export interface Teacher extends Person {
  readonly subject: Subject;
}
