import { incrementalNumber, randFirstName, randLastName } from '@ngneat/falso';
import { Push } from './push.model';

export interface Student extends Push {
  id: number;
  firstname: string;
  lastname: string;
  version: number;
}

const factoryStudent = incrementalNumber();

export const randStudent = (): Student => ({
  id: factoryStudent(),
  firstname: randFirstName(),
  lastname: randLastName(),
  version: 0,
  type: 'student',
});

export const isStudent = (notif: Push): notif is Student => {
  return notif.type === 'student';
};
