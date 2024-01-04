import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User, UserPipe } from 'user';

/* 
// Useful Resources

- https://github.com/nrwl/nx/issues/4463
- https://www.youtube.com/watch?v=m1NTKbHwNJk&t=476s
- https://stackoverflow.com/questions/48595065/how-to-lazy-load-a-module-from-nrwl-workspace-libs-folder
- https://github.com/nrwl/nx/issues/18552 
*/

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
