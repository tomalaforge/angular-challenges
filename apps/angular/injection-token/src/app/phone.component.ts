import { Component, inject } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { TIMER, provideTimer } from './timer.token';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `
    <div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />
  `,
  providers: [provideTimer(2000)],
})
export default class PhoneComponent {
  timer = inject(TIMER);
}
