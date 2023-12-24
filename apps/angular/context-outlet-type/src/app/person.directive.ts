import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

export interface Person {
  name: string;
  age: number;
}

interface PersonContext {
  $implicit: string;
  person: string;
  name: Person;
  age: number; // need to add age here -> angular docs had example where video didn't need to be added?
}

@Directive({
  selector: 'ng-template[personRef]', // helps to limit scope further
  standalone: true,
})
export class PersonDirective implements OnInit {
  @Input() personRef!: string;
  @Input() person!: Person;

  // can inject as well ?
  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<PersonContext>,
  ) {}

  ngOnInit(): void {
    const context = {
      $implicit: this.personRef,
      person: this.personRef,
      name: this.person,
    };
    this.viewContainerRef.createEmbeddedView(this.templateRef, context);
  }

  static ngTemplateContextGuard(
    directive: PersonDirective,
    context: unknown,
  ): context is PersonContext {
    return true;
  }
}
