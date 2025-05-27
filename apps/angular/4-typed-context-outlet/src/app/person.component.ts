import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { PersonDirective } from './person.directive';
import { AppTemplateOutletDirective } from './templateOutlet.directive';

export interface IPerson {
  name: string;
  age: number;
}

@Component({
  imports: [NgTemplateOutlet, AppTemplateOutletDirective, CommonModule],
  selector: 'person',
  template: `
    <ng-container
      *ngTemplateOutlet="
        personTemplateRef || emptyRef;
        context: { $implicit: person.name, age: person.age }
      "></ng-container>

    <ng-template #emptyRef>No Template</ng-template>
  `,
})
export class PersonComponent {
  @Input() person!: IPerson;

  @ContentChild(PersonDirective, { read: TemplateRef })
  personTemplateRef!: TemplateRef<unknown>;
}
