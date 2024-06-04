import { Component, input } from '@angular/core';

import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Person } from './person.model';
import { FibonacciPipe } from './pipes/fibonacci.pipe';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    TitleCasePipe,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    FibonacciPipe,
  ],
  template: `
    <h1 class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <mat-form-field class="w-4/5">
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label" />
    </mat-form-field>

    <mat-list class="flex w-full">
      @for (person of persons(); track $index) {
        <mat-list-item>
          <div MatListItemLine class="flex justify-between">
            <h3>{{ person.name }}</h3>
            <mat-chip>{{ person.fib | fibonacci }}</mat-chip>
          </div>
        </mat-list-item>
      }
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  persons = input<Person[]>([]);
  title = input<string>('');

  label = '';
}
