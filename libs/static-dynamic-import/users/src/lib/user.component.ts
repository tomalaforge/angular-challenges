import { Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from './user.model';

import { Component } from '@angular/core';
@Component({
  selector: 'sdi-user',
  imports: [MatIconModule],
  template: `
    <mat-icon aria-hidden="false" aria-label="user icon" fontIcon="person" />
    <div>{{ user.name }} {{ user.lastName }}</div>
  `,
  host: {
    class: 'flex',
  },
})
export class UserComponent {
  @Input({ required: true }) user!: User;
}
