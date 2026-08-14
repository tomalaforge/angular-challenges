import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'app-home',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div>Home</div>
  `,
})
export default class HomeComponent {}
