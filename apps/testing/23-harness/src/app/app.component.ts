import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  imports: [ChildComponent],
  selector: 'app-root',
  template: `
    <app-child />
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [''],
})
export class AppComponent {}
