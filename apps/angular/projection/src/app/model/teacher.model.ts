import { Entity } from './entity.model';

export const subject = [
  'Sciences',
  'History',
  'English',
  'Maths',
  'Sport',
] as const;
export type Subject = (typeof subject)[number];

export interface Teacher extends Entity {
  firstname: string;
  lastname: string;
  subject: Subject;
}
