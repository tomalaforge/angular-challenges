import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  Signal,
  TemplateRef,
} from '@angular/core';
import { PersonDirective } from './directives/person.directive';
import { PersonContext } from './models/context';

interface Person {
  name: string;
  age: number;
}

@Component({
  standalone: true,
  imports: [NgTemplateOutlet],
  selector: 'person',
  template: `
    <ng-container
      *ngTemplateOutlet="
        personTemplateRef() || emptyRef;
        context: { $implicit: person().name, age: person().age }
      "></ng-container>

    <ng-template #emptyRef>No Template</ng-template>
  `,
})
export class PersonComponent {
  person = input.required<Person>();
  personTemplateRef: Signal<TemplateRef<PersonContext>> = contentChild.required(
    PersonDirective,
    { read: TemplateRef },
  );
}
