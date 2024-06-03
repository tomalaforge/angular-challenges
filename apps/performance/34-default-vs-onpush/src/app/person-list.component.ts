import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { PersonCreateComponent } from './person-create.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title | titlecase }}
    </h1>

    <app-person-create (newPerson)="onNewPerson($event)" />

    <mat-list class="flex w-full">
      <div *ngIf="names?.length === 0" class="empty-list-label">Empty list</div>
      <mat-list-item
        *ngFor="let name of names"
        cd-flash
        class="text-orange-500">
        <div MatListItemLine class="flex justify-between">
          <h3 title="Name">
            {{ name }}
          </h3>
        </div>
      </mat-list-item>
      <mat-divider *ngIf="names?.length !== 0"></mat-divider>
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatChipsModule,
    CDFlashingDirective,
    PersonCreateComponent,
  ],
})
export class PersonListComponent {
  @Input() names: string[] = [];
  @Input() title = '';

  onNewPerson(name: string) {
    this.names?.unshift(name);
  }
}
