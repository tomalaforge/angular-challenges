import { Component } from '@angular/core';
import { CityCardComponent } from './component/city-card/city-card.component';
import { StudentCardComponent } from './component/student-card/student-card.component';
import { TeacherCardComponent } from './component/teacher-card/teacher-card.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <div class="cards-grid">
        <app-teacher-card />
        <app-student-card />
        <app-city-card />
      </div>
    </div>
  `,
  styles: [
    `
      .app-container {
        @apply min-h-screen bg-gray-50 p-8;
      }
      .cards-grid {
        @apply grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3;
        @apply mx-auto max-w-7xl;
      }
    `,
  ],
  imports: [TeacherCardComponent, StudentCardComponent, CityCardComponent],
})
export class AppComponent {}
