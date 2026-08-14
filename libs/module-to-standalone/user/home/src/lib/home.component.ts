import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-user-home',
  template: `
    User Home component
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class UserHomeComponent {}
