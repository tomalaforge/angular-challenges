import { Directive, DoCheck, ElementRef, inject, NgZone } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[cd-flash]',
})
export class CDFlashingDirective implements DoCheck {
  private readonly elementRef = inject(ElementRef);
  private readonly zone = inject(NgZone);

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
