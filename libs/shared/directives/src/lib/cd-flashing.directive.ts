/* eslint-disable @angular-eslint/directive-selector */
import { Directive, DoCheck, ElementRef, NgZone } from '@angular/core';

@Directive({
  selector: '[cd-flash]',
})
export class CDFlashingDirective implements DoCheck {
  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
  ) {}

  ngDoCheck(): void {
    this.cdRan();
  }

  public cdRan(): void {
    this.zone.runOutsideAngular(() => {
      this.elementRef.nativeElement.classList.add('!bg-orange-500');
      setTimeout(() => {
        this.elementRef.nativeElement.classList.remove('!bg-orange-500');
      }, 1000);
    });
  }
}
