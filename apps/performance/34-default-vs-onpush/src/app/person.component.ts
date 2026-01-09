import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { PersonListComponent } from './person-list.component';
import { PersonFormComponent } from './person.form.component';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  imports: [TitleCasePipe, PersonListComponent, PersonFormComponent],
  template: `
    <h1 class="text-center font-semibold" title="Title">
      {{ gender() | titlecase }}
    </h1>

    <person-form (addLabel)="onAddLabel($event)" />
    <app-person-list [names]="names()" />
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  providers: [PersonService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {
  service = inject(PersonService);
  gender = input<'male' | 'female'>('male');
  names = this.service.list;

  constructor() {
    effect(() => this.service.initList(this.gender()));
  }

  onAddLabel(label: string) {
    this.service.add(label);
  }
}
