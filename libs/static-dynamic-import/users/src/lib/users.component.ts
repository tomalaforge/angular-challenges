import { Component } from '@angular/core';

import { randCountry, randFirstName, randLastName } from '@ngneat/falso';
import type { User } from './user.model';
import { UserPipe } from './user.pipe';

export const randUser = (): User => ({
  name: randFirstName(),
  lastname: randLastName(),
  country: randCountry(),
});

@Component({
  selector: 'sdi-users',
  standalone: true,
  imports: [UserPipe],
  template: `
    <h1 class="mt-4 text-xl">List of Users</h1>
    @for (user of users; track user) {
      <div>{{ user | user }}</div>
    }
  `,
  host: {
    class: 'flex flex-col',
  },
})
export default class UsersComponent {
  users = [
    randUser(),
    randUser(),
    randUser(),
    randUser(),
    randUser(),
    randUser(),
  ];
}
