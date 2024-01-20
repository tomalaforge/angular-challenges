import {
  UserPipe,
  type User,
} from '@angular-challenges/static-dynamic-import/users';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [UserPipe, RouterOutlet],
  selector: 'app-root',
  template: `
    Author: {{ author | user }}
    <router-outlet />
  `,
  host: {
    class: 'flex flex-col',
  },
})
export class AppComponent {
  author: User = {
    name: 'Thomas',
    lastname: 'Laforge',
    country: 'France',
  };
}
