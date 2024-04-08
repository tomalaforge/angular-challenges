import {
  Directive,
  EmbeddedViewRef,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
})
export class NgForWithEmptyDirective<T, U> {
  private vcr = inject(ViewContainerRef);
  private emptyViewRef?: EmbeddedViewRef<U>;

  ngForOf = input<T[]>();
  ngForEmpty = input<TemplateRef<U>>();

  constructor() {
    effect(() => {
      this.emptyViewRef?.destroy();

      const ngForEmpty = this.ngForEmpty();
      const ngForOf = this.ngForOf();

      if ((!ngForOf || ngForOf.length === 0) && ngForEmpty) {
        this.emptyViewRef = this.vcr.createEmbeddedView(ngForEmpty);
      }
    });
  }
}
