import { IModel } from './base.model';

export const subject = [
  'Sciences',
  'History',
  'English',
  'Maths',
  'Sport',
] as const;
export type Subject = (typeof subject)[number];

export interface Teacher extends IModel {
  firstName: string;
  lastName: string;
  subject: Subject;
}
