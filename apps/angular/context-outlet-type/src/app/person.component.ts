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

interface PersonContext<T> {
  $implicit: T;
  appPerson: T;
  age: number;
}

@Directive({
  selector: 'ng-template[appPerson]',
  standalone: true,
})
export class PersonDirective<T> {
  @Input({ required: true }) appPerson!: T;

  static ngTemplateContextGuard<TContext>(
    dir: PersonDirective<TContext>,
    ctx: unknown,
  ): ctx is PersonContext<TContext> {
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

    <ng-template #emptyRef>No Template</ng-template>
  `,
})
export class PersonComponent {
  @Input() person!: Person;

  @ContentChild(PersonDirective, { read: TemplateRef })
  personTemplateRef!: TemplateRef<unknown>;
}
