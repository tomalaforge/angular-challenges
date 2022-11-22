import {
  incrementalNumber,
  rand,
  randFirstName,
  randLastName,
} from '@ngneat/falso';
import { Push } from './push.model';

export const subject = [
  'Sciences',
  'History',
  'English',
  'Maths',
  'Sport',
] as const;
export type Subject = typeof subject[number];

export interface Teacher extends Push {
  id: number;
  firstname: string;
  lastname: string;
  subject: Subject;
}

const factoryTeacher = incrementalNumber();

export const randTeacher = () => ({
  id: factoryTeacher(),
  firstname: randFirstName(),
  lastname: randLastName(),
  subject: rand(subject),
  type: 'teacher',
});

export const isTeacher = (notif: Push): notif is Teacher => {
  return notif.type === 'teacher';
};
