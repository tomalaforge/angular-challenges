import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';

@Component({
  imports: [NgTemplateOutlet],
  // eslint-disable-next-line @angular-eslint/component-selector
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
  person = input.required<{ name: string; age: number }>();

  personTemplateRef = contentChild('personRef', { read: TemplateRef });
}
