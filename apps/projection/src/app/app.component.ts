import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CityCardComponent } from './component/city-card/city-card.component';
import { StudentCardComponent } from './component/student-card/student-card.component';
import { TeacherCardComponent } from './component/teacher-card/teacher-card.component';

@Component({
  selector: 'app-root',
  styles: [
    `
      :host {
        display: flex;
        gap: 1rem;
        align-items: center;
        height: 100vh;
        max-width: 900px;
        margin: 0 auto;
        justify-content: space-evenly;
        padding: 1rem;
      }
    `,
  ],
  template: `
    <app-teacher-card></app-teacher-card>
    <app-student-card></app-student-card>
    <app-city-card></app-city-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TeacherCardComponent, StudentCardComponent, CityCardComponent],
})
export class AppComponent {}
