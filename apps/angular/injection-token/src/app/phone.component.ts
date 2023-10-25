import { Component,inject } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { DEFAULT_TIMER } from './data';

@Component({
  standalone: true,
  imports: [TimerContainerComponent],
  providers: [{ provide: DEFAULT_TIMER, useValue: 2000 }],
  template: `<div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">{{phoneTimer}}s</p>
    </div>
    <timer-container />`,
})
export default class PhoneComponent {
  phoneTimer = inject(DEFAULT_TIMER)
}
