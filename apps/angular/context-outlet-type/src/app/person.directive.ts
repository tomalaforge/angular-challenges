import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

// Extra property added to Person
// There is no error if it is not added to PersonContext
// There will be an error if the property added is not optional
export interface Person {
  name: string;
  age: number;
  //extra?: string;
}

interface PersonContext {
  $implicit: Person;
  person: string;
  name: Person;
  age: number;
}

@Directive({
  selector: 'ng-template[personRef]', // helps to limit scope further
  standalone: true,
})
export class PersonDirective implements OnInit {
  @Input() personRef!: string;
  @Input() person!: Person; // this Input is what gives the typing

  /*
  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<PersonContext>,
  ) {}
  */

  // # -> new way to make variables private

  readonly #viewContainerRef = inject(ViewContainerRef);
  readonly #templateRef = inject(TemplateRef<PersonContext>);

  ngOnInit(): void {
    const context = {
      $implicit: this.person,
      person: this.personRef,
      name: this.person,
    };
    this.#viewContainerRef.createEmbeddedView(this.#templateRef, context);
  }

  static ngTemplateContextGuard(
    directive: PersonDirective,
    context: unknown,
  ): context is PersonContext {
    return true;
  }
}
