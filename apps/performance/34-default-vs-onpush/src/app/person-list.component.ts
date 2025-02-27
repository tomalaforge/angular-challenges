import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NameListComponent } from './name-list.component';
import { PersonInputComponent } from './person-input.component';
@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    PersonInputComponent,
    NameListComponent,
    CDFlashingDirective,
    CommonModule,
  ],
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title | titlecase }}
    </h1>

    <app-person-input (addPerson)="addPerson($event)" />
    <app-name-list [names]="names" />
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() names: string[] = [];
  @Input() title = '';

  addPerson(name: string) {
    this.names = [name, ...this.names];
  }
}
