import { Directive, input } from '@angular/core';

@Directive({
  selector: '[sectionCard]',
})
export class SectionCardDirective {
  sectionCard = input.required<['header', 'footer'][number]>();
}
