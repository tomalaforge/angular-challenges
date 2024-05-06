import { NgFor } from '@angular/common';
import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngForEmpty]',
  standalone: true,
  hostDirectives: [{ directive: NgFor, inputs: ['ngForOf:ngForEmptyOf'] }],
})
export class NgForEmptyDirective<T> implements DoCheck {
  private readonly vcr = inject(ViewContainerRef);
  readonly ngForEmptyOf = input.required<T[] | undefined>();
  readonly ngForEmptyEmpty = input.required<TemplateRef<any>>();

  private ref?: EmbeddedViewRef<unknown>;

  ngDoCheck(): void {
    this.ref?.destroy();

    if (!this.ngForEmptyOf()?.length) {
      this.ref = this.vcr.createEmbeddedView(this.ngForEmptyEmpty());
    } else {
      this.ref?.destroy();
    }
  }
}

// @Directive({
//   // eslint-disable-next-line @angular-eslint/directive-selector
//   selector: '[ngFor]', // same selector as NgForDirective of CommonModule
//   standalone: true,
// })
// export class NgForEmptyDirective<T> implements DoCheck {
//   private readonly vcr = inject(ViewContainerRef);
//   readonly ngForOf = input.required<T[] | undefined>();
//   readonly ngForEmpty = input.required<TemplateRef<any>>();
//
//   private ref?: EmbeddedViewRef<unknown>;
//
//   ngDoCheck(): void {
//     this.ref?.destroy();
//
//     if (!this.ngForOf()?.length) {
//       this.ref = this.vcr.createEmbeddedView(this.ngForEmpty());
//     } else {
//       this.ref?.destroy();
//     }
//   }
// }
