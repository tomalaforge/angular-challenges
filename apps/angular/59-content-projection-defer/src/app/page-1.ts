import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-1',
  template: `
    page1
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page1 {}
