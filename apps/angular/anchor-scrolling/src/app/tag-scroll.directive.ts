/* eslint-disable @angular-eslint/directive-selector */
import { ViewportScroller } from '@angular/common';
import { Directive, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[tag-scroll]',
  standalone: true,
})
export class TagScrollDirective {
  @Input() tag!: string;
  scroller = inject(ViewportScroller);
  @HostListener('click') onClick() {
    if (this.tag) {
      this.scroller.scrollToAnchor(this.tag);
    }
  }
}
