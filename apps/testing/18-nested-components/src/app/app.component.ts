import { Component } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  imports: [ChildComponent],
  selector: 'app-root',
  template: `
    <app-child></app-child>
  `,
})
export class AppComponent {}
