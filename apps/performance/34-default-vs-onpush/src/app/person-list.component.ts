import { Component, Input, input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { PersonListContainerComponent } from './person-list-container.component';
import { PersonListInputComponent } from './person-list-input.component';

@Component({
  selector: 'app-person-list',
  imports: [
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    CDFlashingDirective,
    TitleCasePipe,
    // Child components
    PersonListInputComponent,
    PersonListContainerComponent,
  ],
  template: `
    <h1 class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <app-person-list-input
      [names]="names"
      (newNames)="handleNewNames($event)"></app-person-list-input>
    <app-person-list-container [names]="names"></app-person-list-container>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() names: string[] = [];
  title = input('');

  handleNewNames(newNames: string[]) {
    this.names = [...newNames];
  }
}
