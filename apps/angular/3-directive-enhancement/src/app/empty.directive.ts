import { NgFor } from '@angular/common';
import {
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngForEmpty]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgFor,
      inputs: ['ngForOf:ngForEmptyOf'],
    },
  ],
})
class NgForEmptyDirective<T> implements OnChanges {
  private vcr = inject(ViewContainerRef);

  @Input() ngForEmptyOf: T[] | undefined;

  @Input() ngForEmptyElse!: TemplateRef<unknown>;

  private ref?: EmbeddedViewRef<unknown>;

  ngOnChanges(): void {
    this.ref?.destroy();

    if (!this.ngForEmptyOf || this.ngForEmptyOf.length === 0) {
      this.ref = this.vcr.createEmbeddedView(this.ngForEmptyElse);
    }
  }
}

export { NgForEmptyDirective as NgForEmpty };
