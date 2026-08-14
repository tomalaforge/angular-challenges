import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bar',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    BarComponent
  `,
})
export class BarComponent {}
