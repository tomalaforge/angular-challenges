import { CardModel } from './card-model';

export const subject = [
  'Sciences',
  'History',
  'English',
  'Maths',
  'Sport',
] as const;
export type Subject = (typeof subject)[number];

export class Teacher implements CardModel {
  id!: number;
  firstName!: string;
  lastName!: string;
  subject!: Subject;

  get displayName(): string {
    return this.firstName;
  }
}
