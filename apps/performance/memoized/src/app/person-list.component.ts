import { Component, input, signal } from '@angular/core';

import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { FibonacciPipe } from './fibonacci.pipe';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    FibonacciPipe,
    FormsModule,
    MatChip,
    MatFormField,
    MatInput,
    MatList,
    MatListItem,
    TitleCasePipe,
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
      @for (person of persons(); track person) {
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
  persons = input.required<Person[]>();
  title = input.required<string>();

  label = signal('');
}
