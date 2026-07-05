import {Component, Directive, effect, ElementRef, HostListener, inject, input, Renderer2, signal} from '@angular/core';
import { CommonModule } from '@angular/common';

// Статический
@Directive({
  selector: '[border]',
})
export class BorderDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  constructor() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'border', '1px solid #000');
  }
}

// // Динамический
// @Directive({
//   selector: '[hoverBorder]',
// })
// export class BorderHoverDirective {
//   private readonly elementRef = inject(ElementRef);
//   private readonly renderer = inject(Renderer2);
//
//   @HostListener('mouseenter')
//   onMouseEnter() {
//     this.renderer.setStyle(this.elementRef.nativeElement, 'border', '1px solid #000');
//   }
//
//   @HostListener('mouseleave')
//   onMouseLeave() {
//     this.renderer.removeStyle(this.elementRef.nativeElement, 'border');
//   }
// }

// Динамический современный
@Directive({
  selector: '[hoverBorder]',
  host: {
    '[style.border]': `isHover() ? '1px solid #000' : 'none'`,
    '(mouseenter)': 'isHover.set(true)',
    '(mouseleave)': 'isHover.set(false)'
  }
})
export class BorderHoverDirective {
  readonly isHover = signal(false);
}

// // Динамический современный c инпутом
// @Directive({
//   selector: '[hoverBorder]',
//   host: {
//     '[style.border]': "isHover() ? `1px solid ${borderColor()}` : 'none'",
//     '(mouseenter)': 'isHover.set(true)',
//     '(mouseleave)': 'isHover.set(false)'
//   }
// })
// export class BorderHoverDirective {
//   readonly borderColor = input<string>('#000000', { alias: 'hoverBorder' });
//
//   readonly isHover = signal(false);
// }


@Component({
  selector: 'app-custom-attribute-directive',
  imports: [CommonModule, BorderDirective],
  templateUrl: './custom-attribute-directive.html',
  styleUrls: ['./custom-attribute-directive.css'],
})
export class CustomAttributeDirectiveExample {}
