import { Component } from '@angular/core';
import { TimerConfig } from './app.config';
import { TimerContainerComponent } from './timer-container.component';
import { TIMER_TOKEN } from './token';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  providers: [
    {
      provide: TIMER_TOKEN,
      useValue: new TimerConfig({ DEFAULT_TIMER: 2000 }),
    },
  ],
  template: `
    <div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />
  `,
})
export default class PhoneComponent {}
