import { Directive, input } from '@angular/core';

@Directive({
  selector: '[cardSection]',
})
export class CardSectionDirective {
  cardSection = input.required<['header', 'footer'][number]>();
}
