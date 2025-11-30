import { Component } from '@angular/core';
import { PersonComponent } from './person.component';
import { RandomComponent } from './random.component';

@Component({
  imports: [RandomComponent, PersonComponent],
  selector: 'app-root',
  template: `
    <app-random />

    <div class="flex">
      <app-person gender="female" title="Female"></app-person>
      <app-person gender="male" title="Male"></app-person>
    </div>
  `,
})
export class AppComponent {}
