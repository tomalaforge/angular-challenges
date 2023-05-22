import { Directive, HostListener, Input, inject } from '@angular/core';
import { ScrollManagerDirective } from './scroll-manager.directive';

@Directive({
  selector: '[appScrollAnchor]',
  standalone: true,
})
export class ScrollAnchorDirective {
  @Input('appScrollAnchor') id!: string;

  manager = inject(ScrollManagerDirective, { skipSelf: true });

  @HostListener('click')
  scroll() {
    this.manager.scroll(this.id);
  }
}
