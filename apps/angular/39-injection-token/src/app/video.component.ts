import { Component } from '@angular/core';
import { getDefaultTimerProvider } from './data';
import { TimerContainerComponent } from './timer-container.component';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [TimerContainerComponent],
  providers: [getDefaultTimerProvider(1)],
  template: `
    <div class="flex gap-2">
      Video Call Timer:
      <p class="italic">(should be the default 1000s)</p>
    </div>
    <timer-container />
  `,
})
export default class VideoComponent {}
