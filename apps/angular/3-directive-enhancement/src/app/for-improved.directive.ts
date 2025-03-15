import {
  Directive,
  inject,
  input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor][ngForOf][ngForEmpty]',
})
export class ForImprovedDirective<T, U> implements OnChanges {
  ngForOf = input.required<T[]>();
  ngForEmpty = input<TemplateRef<U>>();

  #vcr = inject(ViewContainerRef);

  ngOnChanges() {
    if (this.ngForOf().length === 0 && this.ngForEmpty()) {
      this.#vcr.createEmbeddedView(this.ngForEmpty()!);
    }
  }
}
