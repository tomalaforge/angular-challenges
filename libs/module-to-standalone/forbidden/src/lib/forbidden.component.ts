import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-home',
  template: `
    Forbidden component
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenComponent {}
