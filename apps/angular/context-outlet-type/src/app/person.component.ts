import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';

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
      " />

    <ng-template #emptyRef>No Template</ng-template>
  `,
})
export class PersonComponent {
  person = input.required<Person>();

  readonly personTemplateRef = contentChild.required('personRef', {
    read: TemplateRef,
  });
}
