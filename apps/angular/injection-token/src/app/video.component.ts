import { Component } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { getTimerProvider } from './timer.provide';
import { DEFAULT_TIMER } from './data';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `<div class="flex gap-2">
      Video Call Timer:
      <p class="italic">(should be the default 1000s)</p>
    </div>
    <timer-container />`,
  providers: [getTimerProvider(DEFAULT_TIMER)],
})
export default class VideoComponent {}
