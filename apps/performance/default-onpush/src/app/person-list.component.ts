import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { PersonNameInputComponent } from './person-name-input.component';
import { PersonRowComponent } from './person-row.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatChipsModule,
    CDFlashingDirective,
    PersonRowComponent,
    PersonNameInputComponent,
  ],
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title | titlecase }}
    </h1>

    <app-person-name-input
      (addName)="addPersonName($event)"></app-person-name-input>

    <mat-list class="flex w-full">
      @for (name of names; track name) {
        <app-person-row [name]="name"></app-person-row>
      } @empty {
        <div class="empty-list-label">Empty list</div>
      }
      @if (names.length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() names: string[] = [];
  @Input() title = '';

  addPersonName(name: string) {
    this.names?.unshift(name);
  }
}
