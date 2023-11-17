import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { PersonService } from './list.service';
import { PersonListComponent } from './components/person-list.component';
import { InputComponent } from './components/input.component';

@Component({
  standalone: true,
  imports: [
    PersonListComponent,
    InputComponent
  ],
  providers: [PersonService],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="font-semibold text-center text-3xl" title="Title">
      List of Persons
    </h1>
    <app-input (inputEvent)="this.personService.addPerson($event)" />

    <app-person-list
      class="max-w-2xl w-3/4"
      [persons]="persons()"
      (delete)="personService.deletePerson($event)"
      (update)="personService.updatePerson($event)" />
  `,
  host: {
    class: 'flex items-center flex-col gap-5',
  },
})
export class AppComponent implements OnInit {
  readonly personService = inject(PersonService);
  readonly persons = this.personService.persons;


  ngOnInit(): void {
    this.personService.loadPersons();
  }

}
