import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User, UserPipe } from 'user';

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
