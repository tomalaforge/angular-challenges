import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'app-bar',
  standalone: true,
  template: `
    BarComponent
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarComponent {}
