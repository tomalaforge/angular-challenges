import { NgFor } from '@angular/common';
import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgFor,
      inputs: ['ngForOf'],
    },
  ],
})
export class NgForEnhancenedDirective<T> implements DoCheck {
  private ref?: EmbeddedViewRef<unknown>;
  @Input() ngForElse!: TemplateRef<unknown>;
  @Input() ngForOf: T[] | null | undefined;

  vcr = inject(ViewContainerRef);

  ngDoCheck(): void {
    this.ref?.destroy();
    if (!this.ngForOf || !this.ngForOf.length) {
      this.ref = this.vcr.createEmbeddedView(this.ngForElse);
    } else {
      this.ref?.destroy();
    }
  }
}

export { NgForEnhancenedDirective as NgForElse };
