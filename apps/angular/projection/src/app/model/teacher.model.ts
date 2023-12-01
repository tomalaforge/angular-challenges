import { BaseEntity } from './base-entity.model';

export const subject = [
  'Sciences',
  'History',
  'English',
  'Maths',
  'Sport',
] as const;
export type Subject = (typeof subject)[number];

export interface Teacher extends BaseEntity {
  lastname: string;
  subject: Subject;
}
