import { Component } from '@angular/core';
import { PersonListComponent } from './person-list.component';
import { Persons } from './persons';
import { RandomComponent } from './random.component';

@Component({
  standalone: true,
  imports: [PersonListComponent, RandomComponent],
  selector: 'app-root',
  template: `
    <app-random />

    <div class="flex">
      <app-person-list [data]="personList" title="List 1" />
      <app-person-list [data]="person2List" title="List 2" />
    </div>
  `,
})
export class AppComponent {
  personList = [...Persons];
  person2List = [...Persons];
}
