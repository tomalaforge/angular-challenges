import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { TitleCasePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { PersonCreateComponent } from './person-create.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <app-person-create (newPerson)="onNewPerson($event)" />

    <mat-list class="flex w-full">
      @for (name of names(); track $index) {
        <mat-list-item cd-flash class="text-orange-500">
          <div MatListItemLine class="flex justify-between">
            <h3 title="Name">
              {{ name }}
            </h3>
          </div>
        </mat-list-item>
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
  imports: [
    TitleCasePipe,
    MatListModule,
    MatChipsModule,
    CDFlashingDirective,
    PersonCreateComponent,
  ],
})
export class PersonListComponent {
  names = input<string[]>([]);
  title = input<string>('');

  onNewPerson(name: string) {
    this.names().unshift(name);
  }
}
