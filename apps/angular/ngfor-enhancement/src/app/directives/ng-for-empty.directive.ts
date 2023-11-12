import { NgFor } from '@angular/common';
import {
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
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

  @Input() ngForOf!: T[];
  @Input() ngForEmpty: TemplateRef<U> | undefined;

  ngOnChanges(): void {
    if (this.ngForOf.length === 0 && this.ngForEmpty) {
      this.viewContainer.createEmbeddedView(this.ngForEmpty);
    }
  }
}
