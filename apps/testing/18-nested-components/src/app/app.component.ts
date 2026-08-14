import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  imports: [ChildComponent],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <app-child></app-child>
  `,
})
export class AppComponent {}
