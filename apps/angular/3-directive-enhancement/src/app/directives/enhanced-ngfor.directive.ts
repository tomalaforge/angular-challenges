import { NgForOf } from '@angular/common';
import {
  Directive,
  Input,
  IterableDiffers,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngFor][ngForOf][ngForEmpty]',
  standalone: true,
})
export class EnhancedNgForDirective<T> extends NgForOf<T> {
  @Input('ngForEmpty') empty!: TemplateRef<any>;
  private vcRef: ViewContainerRef;

  constructor(
    viewContainer: ViewContainerRef,
    template: TemplateRef<any>,
    differs: IterableDiffers,
  ) {
    super(viewContainer, template, differs);
    this.vcRef = viewContainer;
  }

  override ngDoCheck(): void {
    if (
      this.ngForOf &&
      Array.isArray(this.ngForOf) &&
      this.ngForOf.length === 0
    ) {
      this.vcRef.clear();
      this.vcRef.createEmbeddedView(this.empty);
    } else {
      super.ngDoCheck();
    }
  }
}
