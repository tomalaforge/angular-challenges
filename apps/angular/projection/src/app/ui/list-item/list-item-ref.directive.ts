import { Directive } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'ng-template[listItemRef]',
})
export class ListItemRefDirective {}
