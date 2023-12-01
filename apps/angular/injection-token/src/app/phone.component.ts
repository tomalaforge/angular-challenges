import { Component } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { getTimerProvider } from './timer.provide';
import { TWO_SEC_TIMER } from './data';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `<div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />`,
  providers: [getTimerProvider(TWO_SEC_TIMER)],
})
export default class PhoneComponent {}
