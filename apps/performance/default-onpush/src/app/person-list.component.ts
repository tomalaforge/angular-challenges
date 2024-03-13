import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  signal,
} from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { HeaderComponent } from './header.component';
import { InputComponent } from './input.component';
import { PersonItemsComponent } from './person-items.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CDFlashingDirective,
    InputComponent,
    HeaderComponent,
    PersonItemsComponent,
  ],
  template: `
    <app-header [title]="title()"></app-header>
    <app-input (addItem)="addItem($event)"></app-input>
    <app-person-items [names]="_names()"></app-person-items>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  _names = signal<string[]>([]);

  @Input() set names(value: string[]) {
    this._names.update(() => value);
  }
  title = input.required<string>();

  addItem(name: string) {
    this._names.update((names) => [...names, name]);
  }
}
