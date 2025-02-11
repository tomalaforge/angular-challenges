import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PersonService } from './list.service';
import { PersonListComponent } from './person-list.component';

@Component({
  standalone: true,
  imports: [
    PersonListComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [PersonService],
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="mx-auto max-w-4xl">
        <h1 class="mb-8 text-center text-3xl font-bold text-gray-900">
          List of Persons
        </h1>

        <div class="rounded-lg bg-white p-6 shadow-lg">
          <mat-form-field class="mb-6 w-full">
            <input
              placeholder="Add one member to the list"
              matInput
              type="text"
              [(ngModel)]="label"
              (keydown)="handleKey($event)" />
          </mat-form-field>

          <app-person-list
            [persons]="persons()"
            (delete)="personService.deletePerson($event)"
            (update)="personService.updatePerson($event)" />
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly personService = inject(PersonService);
  readonly persons = this.personService.persons;
  label = '';

  ngOnInit(): void {
    this.personService.loadPersons();
  }

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.label.trim()) {
      this.personService.addPerson(this.label);
      this.label = '';
    }
  }
}
