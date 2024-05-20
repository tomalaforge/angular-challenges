import { randFirstName, randLastName, randText } from '@ngneat/falso';

export interface User {
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  apiKey: string;
}

export const user: User = {
  firstname: randFirstName(),
  lastname: randLastName(),
  isAdmin: true,
  apiKey: randText(),
};
