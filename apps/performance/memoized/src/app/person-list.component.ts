import {
  ChangeDetectionStrategy,
  Component,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';
import { generateList } from './generateList';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { InputComponent } from './components/input.component';
import { ListComponent } from './components/list.component';
import { Person } from './person.model';
import { randNumber } from '@ngneat/falso';

@Component({
  selector: 'app-person-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe, InputComponent, ListComponent, AsyncPipe],
  template: `
    <h1 class="font-semibold text-center" title="Title">
      {{ title | titlecase }}
    </h1>
    <app-input (inputEvent)="addMember($event)" />
    <app-list [persons]="persons()" />
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  persons: WritableSignal<Person[]> = signal(generateList());
  @Input() title = '';

  addMember(event: string) {
    this.persons.update((persons) => [
      {
        name: event,
        fib: randNumber({ min: 25, max: 30, precision: 1 }),
      },
      ...persons,
    ]);
  }
}
