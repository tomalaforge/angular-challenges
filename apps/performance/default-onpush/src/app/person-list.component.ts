import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { PersonRowComponent } from './person-row.component';
import { InputComponent } from './input.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  template: `
    <h1 cd-flash class="font-semibold text-center" title="Title">
      {{ title | titlecase }}
    </h1>

    <app-input class="w-4/5" (addItem)="addItem($event)" />

    <mat-list class="flex w-full">
      <div *ngIf="names?.length === 0" class="empty-list-label">Empty list</div>
      <app-person-row *ngFor="let name of names" [name]="name" />
      <mat-divider *ngIf="names?.length !== 0"></mat-divider>
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatListModule,
    CDFlashingDirective,
    PersonRowComponent,
    InputComponent,
  ],
})
export class PersonListComponent {
  @Input() names: string[] = [];
  @Input() title = '';

  addItem(name: string) {
    this.names?.unshift(name);
  }
}
