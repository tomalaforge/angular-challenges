import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { TitleCasePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { AddPersonComponent } from './add-person.component';
import { PersonRowComponent } from './person-row.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    AddPersonComponent,
    CDFlashingDirective,
    MatListModule,
    TitleCasePipe,
    PersonRowComponent,
  ],
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <app-add-person (addName)="addName($event)" />

    <mat-list class="flex w-full">
      @for (name of names(); track name) {
        <app-person-row [name]="name" />
      } @empty {
        <div class="empty-list-label">Empty list</div>
      }
      @if (names().length !== 0) {
        <mat-divider />
      }
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  names = model.required<string[]>();
  title = input.required<string>();

  addName(name: string) {
    this.names.update((names) => [...names, name]);
  }
}
