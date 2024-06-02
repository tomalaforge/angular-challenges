import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
})
export class NgForOfEmptyDirective<T> implements DoCheck {
  private viewContainerRef = inject(ViewContainerRef);

  private embeddedViewRef?: EmbeddedViewRef<unknown>;

  ngForOf = input.required<T[]>();
  ngForEmpty = input.required<TemplateRef<unknown>>();

  /**
   * Ensure, when the change detector runs, to destroy the view for the empty template and re-create it when the ngForOf array is empty
   */
  ngDoCheck(): void {
    this.embeddedViewRef?.destroy();

    if (this.ngForOf() && this.ngForOf().length === 0) {
      this.viewContainerRef.createEmbeddedView(this.ngForEmpty());
    }
  }
}
