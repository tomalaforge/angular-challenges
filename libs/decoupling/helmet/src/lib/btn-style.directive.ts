/* eslint-disable @angular-eslint/directive-selector */
import {
  BUTTON_STATE,
  ButtonStateControl,
} from '@angular-challenges/decoupling/core';
import {
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
} from '@angular/core';

@Directive({
  selector: 'button[hlm]',
  standalone: true,
  host: {
    class:
      'border border-black p-4 rounded-md bg-white data-[state=disabled]:bg-gray-400 data-[state=disabled]:text-white',
  },
})
export class BtnHelmetDirective {
  private btnState = inject<ButtonStateControl>(BUTTON_STATE);
  private renderer = inject(Renderer2);
  private element = inject(ElementRef);

  private rendererEffect = effect(() => {
    this.renderer.setAttribute(
      this.element.nativeElement,
      'data-state',
      this.btnState.state(),
    );
  });
}
