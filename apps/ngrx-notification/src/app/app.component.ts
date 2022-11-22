import { Component } from '@angular/core';
import { StudentComponent } from './student.component';
import { TeacherComponent } from './teacher.component';

@Component({
  standalone: true,
  imports: [TeacherComponent, StudentComponent],
  selector: 'app-root',
  template: `
    <teacher></teacher>
    <student></student>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 20px;
      }
    `,
  ],
})
export class AppComponent {}
