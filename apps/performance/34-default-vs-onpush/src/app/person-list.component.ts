import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { PersonItemComponent } from './person.item.component';

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
  ],
  template: `
    <mat-list class="flex w-full">
      @for (name of names(); track name) {
        <app-person-item [name]="name"></app-person-item>
      } @empty {
        <div class="empty-list-label">Empty list</div>
      }
      @if (names.length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  names = input.required<string[]>();
}
