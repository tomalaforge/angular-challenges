import { Component } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { TIMER_TOKEN } from './data';

// Phone and Video component don't have selectors - this causes collison issues
// Both use ng-component
// Injection Tokens are automatically unique but not components

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  providers: [{ provide: TIMER_TOKEN, useValue: 2000 }],
  template: `<div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />`,
})
export default class PhoneComponent {}
