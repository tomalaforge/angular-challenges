import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[cardBgColor]',
  standalone: true,
})
export class CardBgColorDirective implements OnChanges {
  @Input() cardBgColor = '';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cardBgColor']?.currentValue) {
      this.setBgColor(changes['cardBgColor'].currentValue);
    }
  }

  private setBgColor(color: string) {
    if (!color) {
      return;
    }

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      color,
    );
  }
}
