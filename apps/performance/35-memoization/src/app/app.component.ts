import { Component } from '@angular/core';
import { generateList } from './generateList';
import { PersonListComponent } from './person-list.component';

@Component({
  imports: [PersonListComponent],
  selector: 'app-root',
  template: `
    <p>Performance is key!!</p>
    <button
      (click)="loadList = true"
      class="rounded-md border border-black p-2">
      Load List
    </button>

    @if (loadList) {
      <app-person-list class="max-w-2xl" [persons]="persons" title="Persons" />
    }
  `,
})
export class AppComponent {
  persons = generateList();
  loadList = false;
}
