/* eslint-disable @angular-eslint/directive-selector */
import { NgFor } from '@angular/common';
import {
  Directive,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[ngFor][ngForOf]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgFor,
      inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
    },
  ],
})
export class NgForEmptyDirective<T, U> implements OnChanges {
  private viewContainer = inject(ViewContainerRef);

  ngForOf = input.required<T[]>();
  ngForEmpty = input.required<TemplateRef<U>>();

  ngOnChanges(): void {
    if (this.ngForOf().length === 0 && this.ngForEmpty()) {
      this.viewContainer.createEmbeddedView(this.ngForEmpty());
    }
  }
}
