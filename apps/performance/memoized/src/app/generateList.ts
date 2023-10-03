import { randFirstName, randNumber } from '@ngneat/falso';
import { Person } from './person.model';

export function generateList() {
  const arr: Person[] = [];

  for (let i = 0; i < 100; i++) {
    arr.push({
      name: randFirstName(),
      fib: randNumber({ min: 25, max: 30, precision: 1 }),
    });
  }

  return arr;
}
