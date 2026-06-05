import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PersonService } from './list.service';
import { PersonListComponent } from './person-list.component';

@Component({
  imports: [
    PersonListComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [PersonService],
  selector: 'app-root',
  template: `
    <h1 class="text-center text-3xl font-semibold" title="Title">
      List of Persons
    </h1>

    <mat-form-field class="w-3/4">
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>

    <app-person-list
      class="w-3/4 max-w-2xl"
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

  label = '';

  ngOnInit(): void {
    this.personService.loadPersons();
  }

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.personService.addPerson(this.label);
      this.label = '';
    }
  }
}
