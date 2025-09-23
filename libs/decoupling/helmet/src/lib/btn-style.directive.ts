/* eslint-disable @angular-eslint/directive-selector */
import { BtnDisabledDirective } from '@angular-challenges/decoupling/brain';
import {
  Directive,
  effect,
  ElementRef,
  inject,
  Renderer2,
  signal,
} from '@angular/core';

@Directive({
  selector: 'button[hlm]',
  host: {
    class:
      'border border-black p-4 rounded-md bg-white data-[state=disabled]:bg-gray-400 data-[state=disabled]:text-white',
  },
})
export class BtnHelmetDirective {
  btnState = inject(BtnDisabledDirective, { self: true });
  public state = this.btnState?.state ?? signal('disabled').asReadonly();
  private renderer = inject(Renderer2);
  private element = inject(ElementRef);

  private rendererEffect = effect(() => {
    this.renderer.setAttribute(
      this.element.nativeElement,
      'data-state',
      this.state(),
    );
  });
}
