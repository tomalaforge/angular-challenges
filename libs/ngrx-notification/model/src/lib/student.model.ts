import {
  incrementalNumber,
  randFirstName,
  randLastName,
  randWord,
} from '@ngneat/falso';
import { Push } from './push.model';

export interface Student extends Push {
  id: number;
  firstname: string;
  lastname: string;
  school: string;
}

const factoryStudent = incrementalNumber();

export const randStudent = (): Student => ({
  id: factoryStudent(),
  firstname: randFirstName(),
  lastname: randLastName(),
  school: randWord(),
  type: 'student',
});

export const isStudent = (notif: Push): notif is Student => {
  return notif.type === 'student';
};
