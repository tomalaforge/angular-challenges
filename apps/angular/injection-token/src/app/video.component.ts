import { Component, inject } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { TIMER_TOKEN } from './data';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `<div class="flex gap-2">
      Video Call Timer:
      <p class="italic">(should be the default {{ time }}s)</p>
    </div>
    <timer-container />`,
})
export default class VideoComponent {
  // if injection token does not have a default value, you could use providers array
  // providers: [{ provide: TIMER_TOKEN, useValue: 1000 }],
  // no constructor or inject necessary

  // with default value, you could use inject function or Inject decorator
  // Inject decorator uses constructor
  // constructor(@Inject(TIMER_TOKEN) public timer: Number) {}

  // Benefit of using the inject function -> you can interpolate the time in the html
  // vs it being hard-coded with the other options

  time = inject(TIMER_TOKEN);
}
