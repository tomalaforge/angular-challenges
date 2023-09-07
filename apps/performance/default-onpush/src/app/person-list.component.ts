import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Person } from './person';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
  ],
  template: `
    <h1 class="font-semibold text-center" title="Title">
      {{ title }}
    </h1>

    <mat-form-field class="w-4/5">
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>

    <mat-list class="flex w-full">
      <div *ngIf="data?.length === 0" class="empty-list-label">Empty list</div>
      <mat-list-item *ngFor="let item of data">
        <div MatListItemLine class="flex justify-between">
          <h3 title="Name">
            {{ item.label }}
          </h3>
          <div class="px-4 py-2 rounded-3xl bg-gray-400">
            {{ count(item) }}
          </div>
        </div>
      </mat-list-item>
      <mat-divider *ngIf="data?.length !== 0"></mat-divider>
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  @Input() data: Person[] | null = null;
  @Input() title = '';

  label = '';

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.data?.unshift({ label: this.label, num: 0 });
      this.label = '';
    }
  }

  count(person: Person) {
    person.num++;
    return person.num;
  }
}
