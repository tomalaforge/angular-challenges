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

interface PersonContext {
  $implicit: string;
  age: number;
}

@Directive({
  selector: 'ng-template[person]',
  standalone: true,
})
export class PersonDirective {
  static ngTemplateContextGuard(
    dir: PersonDirective,
    ctx: unknown
  ): ctx is PersonContext {
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

  @ContentChild(PersonDirective, { read: TemplateRef })
  personTemplateRef!: TemplateRef<PersonContext>;
}
