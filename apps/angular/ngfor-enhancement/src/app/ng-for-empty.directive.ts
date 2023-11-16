import {
  Directive,
  DoCheck,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { EmptyListDirective } from './empty-list.directive';
import { NgFor } from '@angular/common';

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
export class NgForEmptyDirective<T> implements DoCheck {
  @Input() ngForOf: T[] = [];
  @Input() ngForEmpty!: TemplateRef<EmptyListDirective>;

  constructor(private vcr: ViewContainerRef) {}

  ngDoCheck(): void {
    if (!this.ngForOf.length) {
      this.vcr.createEmbeddedView(this.ngForEmpty);
    }
  }
}
