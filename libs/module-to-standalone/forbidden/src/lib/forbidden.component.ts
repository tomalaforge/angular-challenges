import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-home',
  template: `
    Forbidden component
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ForbiddenComponent {}
