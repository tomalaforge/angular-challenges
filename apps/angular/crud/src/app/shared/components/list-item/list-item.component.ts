import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  template: `
      <ng-content></ng-content>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {}
