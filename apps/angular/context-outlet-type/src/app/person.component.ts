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

@Directive({
  standalone: true,
  selector: '[personTemplate]',
})
export class PersonTemplateDirective {
  @Input() personTemplate!: Person;

  static ngTemplateContextGuard(
    _directive: PersonTemplateDirective,
    _context: unknown
  ): _context is PersonContext {
    return true;
  }
}

interface PersonContext {
  $implicit: Person;
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
        context: {
          $implicit: person,
          name: person.name,
          age: person.age
        }
      "></ng-container>

    <ng-template #emptyRef> No Template </ng-template>
  `,
})
export class PersonComponent {
  @Input() person!: Person;

  @ContentChild(PersonTemplateDirective, { read: TemplateRef })
  personTemplateRef!: TemplateRef<PersonContext>;
}
