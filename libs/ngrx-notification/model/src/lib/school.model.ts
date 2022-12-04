import { incrementalNumber, randCompanyName } from '@ngneat/falso';
import { Push } from './push.model';

export interface School extends Push {
  id: number;
  name: string;
  version: number;
}

const schoolTeacher = incrementalNumber();

export const randSchool = (): School => ({
  id: schoolTeacher(),
  name: randCompanyName(),
  version: 0,
  type: 'school',
});

export const isSchool = (notif: Push): notif is School => {
  return notif.type === 'school';
};
