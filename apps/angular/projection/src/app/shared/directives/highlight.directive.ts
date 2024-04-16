// highlight.directive.ts
import { Directive, ElementRef, Renderer2, effect, input } from '@angular/core';

@Directive({
  selector: '[bgColor]',
  standalone: true,
})
export class HighlightDirective {
  highlightColor = input('', {
    alias: 'bgColor',
  });

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    effect(() => {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        this.highlightColor(),
      );
    });
  }
}
