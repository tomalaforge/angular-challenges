import { Component,inject } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { DEFAULT_TIMER } from './data';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `<div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">{{phoneTimer}}s</p>
    </div>
    <timer-container />
  `,
})
export default class PhoneComponent {
  phoneTimer = inject(DEFAULT_TIMER)
}
