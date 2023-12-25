import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Person, PersonDirective } from './person.directive';

// emptyRef is the alternative template

@Component({
  standalone: true,
  imports: [NgTemplateOutlet],
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
  @Input() person!: Person;

  @ContentChild(PersonDirective, { read: TemplateRef })
  personTemplateRef!: TemplateRef<unknown>; // $implicit doesn't exist on Person

  /*

  // leaving it the way it was -> still works when directive is used ?
 
  @ContentChild('#personRef', { read: TemplateRef })
  personTemplateRef!: TemplateRef<unknown>;

  // the typing depends on the Inputs in the directive
  // TemplateRef<any | unknown> doesn't matter
  */
}
