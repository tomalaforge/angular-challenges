import { incrementalNumber, randFirstName, randLastName } from '@ngneat/falso';
import { Push } from './push.model';

export interface Teacher extends Push {
  id: number;
  firstname: string;
  lastname: string;
  version: number;
}

const factoryTeacher = incrementalNumber();

export const randTeacher = (): Teacher => ({
  id: factoryTeacher(),
  firstname: randFirstName(),
  lastname: randLastName(),
  version: 0,
  type: 'teacher',
});

export const isTeacher = (notif: Push): notif is Teacher => {
  return notif.type === 'teacher';
};
