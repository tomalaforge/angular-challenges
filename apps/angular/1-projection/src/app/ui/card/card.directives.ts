import { Directive } from '@angular/core';

@Directive({
  selector: '[cardHeader]',
  standalone: true,
})
export class CardHeaderDirective {}

@Directive({
  selector: '[cardFooter]',
  standalone: true,
})
export class CardFooterDirective {}
