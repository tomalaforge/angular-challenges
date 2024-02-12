import { Component } from '@angular/core';
import { CityCardComponent } from './components/city-card/city-card.component';
import { StudentCardComponent } from './components/student-card/student-card.component';
import { TeacherCardComponent } from './components/teacher-card/teacher-card.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="grid grid-cols-3 gap-3">
      <app-teacher-card></app-teacher-card>
      <app-student-card></app-student-card>
      <app-city-card></app-city-card>
    </div>
  `,
  standalone: true,
  imports: [TeacherCardComponent, StudentCardComponent, CityCardComponent],
})
export class AppComponent {}
