import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

interface Person {
  name: string;
  age: number;
}

interface PersonContext {
  $implicit: string; // for the name
  age: number;
}

@Component({
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
  standalone: true,
})
export class PersonComponent {
  @Input() person!: Person;

  @ContentChild('personRef', { read: TemplateRef })
  personTemplateRef!: TemplateRef<PersonContext>;

  static ngTemplateContextGuard(
    dir: PersonComponent,
    ctx: unknown,
  ): ctx is PersonContext {
    return true;
  }
}
