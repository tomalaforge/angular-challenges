/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  signal,
} from '@angular/core';
import { injectState } from '@angular-challenges/decoupling/core';

@Directive({
  selector: 'button[hlm]',
  standalone: true,
  host: {
    class:
      'border border-black p-4 rounded-md bg-white data-[state=disabled]:bg-gray-400 data-[state=disabled]:text-white',
  },
})
export class BtnHelmetDirective {
  btnState = injectState({ self: true });
  public state = this.btnState?.state ?? signal('disabled').asReadonly();
  private renderer = inject(Renderer2);
  private element = inject(ElementRef);

  constructor() {
    effect(() => {
      this.renderer.setAttribute(
        this.element.nativeElement,
        'data-state',
        this.state(),
      );
    });
  }
}
