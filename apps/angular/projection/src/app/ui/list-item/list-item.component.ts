import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: ` <ng-content></ng-content> `,
  standalone: true,
})
export class ListItemComponent {}
