import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[appCardContent]',
  standalone: true,
})
export class CardContentDirective {}
