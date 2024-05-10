import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    CDFlashingDirective,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    TitleCasePipe,
  ],
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>

    <mat-list class="flex w-full">
      @for (name of names(); track name) {
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
})
export class PersonListComponent {
  names = model.required<string[]>();
  title = input.required<string>();

  label = '';

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.names.update((names) => [...names, this.label]);
      this.label = '';
    }
  }
}
