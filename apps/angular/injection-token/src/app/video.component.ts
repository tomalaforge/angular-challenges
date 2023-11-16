import { Component, inject } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { DEFAULT_TIMER_TOKEN } from './data';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [TimerContainerComponent],
  providers: [
    {
      provide: DEFAULT_TIMER_TOKEN,
      useValue: '1000'
    }
  ], 
  template: `<div class="flex gap-2">
      Video Call Timer:
      <p class="italic">(should be the default 1000s)</p>
    </div>
    <timer-container />`,
})
export default class VideoComponent {
}
