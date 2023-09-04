/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  effect,
  ElementRef,
  inject,
  Renderer2,
} from '@angular/core';
import { BUTTON_STATE_SIGNAL_TOKEN } from '@angular-challenges/decoupling/core';

@Directive({
  selector: 'button[hlm]',
  standalone: true,
  host: {
    class:
      'border border-black p-4 rounded-md bg-white data-[state=disabled]:bg-gray-400 data-[state=disabled]:text-white',
  },
})
export class BtnHelmetDirective {
  state = inject(BUTTON_STATE_SIGNAL_TOKEN, { self: true });
  private renderer = inject(Renderer2);
  private element = inject(ElementRef);

  constructor() {
    effect(() => {
      this.renderer.setAttribute(
        this.element.nativeElement,
        'data-state',
        this.state()
      );
    });
  }
}
