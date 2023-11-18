import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';

interface Person {
  name: string;
  age: number;
}

interface PersonTemplateContext {
  $implicit: string;
  age: number;
}

@Directive({
  selector: 'ng-template[appPerson]',
  standalone: true,
})
export class PersonTemplateDirective {
  static ngTemplateContextGuard(
    directive: PersonTemplateDirective,
    context: unknown,
  ): context is PersonTemplateContext {
    return true;
  }
}

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

    <ng-template #emptyRef> No Template </ng-template>
  `,
})
export class PersonComponent {
  @Input() person!: Person;

  @ContentChild(PersonTemplateDirective, { read: TemplateRef })
  personTemplateRef!: TemplateRef<PersonTemplateContext>;
}
