import { NgFor, NgForOfContext } from '@angular/common';
import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  IterableDiffers,
  NgIterable,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  selector: '[ngFor]',
  standalone: true,
})
export class NgForEnhancenedDirective<T, U extends NgIterable<T>>
  extends NgFor<T, U>
  implements DoCheck
{
  private ref?: EmbeddedViewRef<unknown>;
  @Input() ngForElse!: TemplateRef<unknown>;

  vcr = inject(ViewContainerRef);

  constructor(
    _viewContainer: ViewContainerRef,
    _template: TemplateRef<NgForOfContext<T, U>>,
    _differs: IterableDiffers,
  ) {
    super(_viewContainer, _template, _differs);
  }

  override ngDoCheck(): void {
    super.ngDoCheck();

    this.ref?.destroy();
    const isEmpty =
      !(this as any)._ngForOf || (this as any)._ngForOf.length === 0;
    if (isEmpty) {
      this.ref = this.vcr.createEmbeddedView(this.ngForElse);
    } else {
      this.ref?.destroy();
    }
  }
}
