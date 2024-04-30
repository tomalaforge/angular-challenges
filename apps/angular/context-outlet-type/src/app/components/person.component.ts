import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, TemplateRef, input } from '@angular/core';
import { PersonTemplateContext } from '../core/person.directive';

export interface Person {
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
        personTemplateRef || emptyRef;
        context: { $implicit: person().name, age: person().age }
      "></ng-container>

    <ng-template #emptyRef>No Template</ng-template>
  `,
})
export class PersonComponent {
  person = input.required<Person>();

  @ContentChild('personRef', { read: TemplateRef })
  personTemplateRef!: TemplateRef<PersonTemplateContext>; //by providing the type 'PersonTemplateContext' instead of unknown, context is strongly typed
}
