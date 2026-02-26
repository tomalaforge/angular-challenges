import { Component } from '@angular/core';
import { CityCardComponent } from './component/city-card/city-card.component';
import { StudentCardComponent } from './component/student-card/student-card.component';
import { TeacherCardComponent } from './component/teacher-card/teacher-card.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="grid grid-cols-3 gap-3">
      <!--los componentes ya tienen dentro la configuracion para usar todos el card sin condiciones if-->
      <app-teacher-card />
      <app-student-card />
      <app-city-card />
    </div>
  `,
  imports: [TeacherCardComponent, StudentCardComponent, CityCardComponent],
})
export class AppComponent {}
