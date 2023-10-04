import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { PersonItemComponent } from './person-item.component';
import { SearchComponent } from './search.component';

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
    CDFlashingDirective,
    PersonItemComponent,
    SearchComponent,
  ],
  template: `
    <h1 cd-flash class="font-semibold text-center" title="Title">
      {{ title | titlecase }}
    </h1>
    <app-search (search)="addPerson($event)"></app-search>
    <mat-list class="flex w-full">
      <div *ngIf="names?.length === 0" class="empty-list-label">Empty list</div>
      <app-person-item
        *ngFor="let name of names"
        [name]="name"></app-person-item>
      <mat-divider *ngIf="names?.length !== 0"></mat-divider>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  @Input() names: string[] = [];
  @Input() title = '';

  label = '';

  addPerson(name: string) {
    console.log(name);
    this.names?.unshift(name);
  }
}
