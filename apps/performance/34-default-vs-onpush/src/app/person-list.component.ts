import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NewPersonInputComponent } from './new-person-input.component';
import { PersonElementComponent } from './person-element.component';

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
    PersonElementComponent,
    NewPersonInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title | titlecase }}
    </h1>

    <!--    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>-->

    <app-new-person-input (addName)="names.unshift($event)" />
    <mat-list class="flex w-full">
      <div *ngIf="names?.length === 0" class="empty-list-label">Empty list</div>
      <app-person-element *ngFor="let name of names" [name]="name" />
      <!--      <mat-list-item

        cd-flash
        class="text-orange-500">
        <div MatListItemLine class="flex justify-between">
          <h3 title="Name">
            {{ name }}
          </h3>
        </div>
      </mat-list-item>-->
      <mat-divider *ngIf="names?.length !== 0"></mat-divider>
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  @Input() names: string[] = [];
  @Input() title = '';

  label = '';

  protected readonly name = name;
}
