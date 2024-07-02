import { Directive } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[listItem]',
})
export class ListItem {
  constructor() {}
}
