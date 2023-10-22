import { randEmail, randFirstName } from '@ngneat/falso';
import { Person } from './person.model';

export function generateList() {
  const arr: Person[] = [];

  for (let i = 0; i < 100000; i++) {
    arr.push({
      email: randEmail(),
      name: randFirstName(),
    });
  }

  return arr;
}
