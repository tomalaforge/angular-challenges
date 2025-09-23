import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from './user.model';

@Component({
  selector: 'sdi-user',
  imports: [MatIconModule],
  template: `
    <mat-icon aria-hidden="false" aria-label="user icon" fontIcon="person" />
    <div>{{ user().name }} {{ user().lastName }}</div>
  `,
  host: {
    class: 'flex',
  },
})
export class UserComponent {
  user = input.required<User>();
}
