import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  Directive,
  input,
  Signal,
  TemplateRef,
} from '@angular/core';

interface PersonContext {
  readonly $implicit: string;
  readonly age: number;
}

export interface Person {
  readonly name: string;
  readonly age: number;
}

@Directive({
  selector: 'ng-template[person]',
})
export class PersonDirective {
  static ngTemplateContextGuard(
    dir: PersonDirective,
    ctx: unknown,
  ): ctx is PersonContext {
    return true;
  }
}

@Component({
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
  readonly person = input.required<Person>();
  protected readonly personTemplateRef: Signal<TemplateRef<PersonContext>> =
    contentChild.required(PersonDirective, {
      read: TemplateRef,
    });
}
