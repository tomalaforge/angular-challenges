import { Component } from '@angular/core';
import { DEFAULT_TIMER } from './data';
import { TimerContainerComponent } from './timer-container.component';

@Component({
  selector: 'app-video',
  imports: [TimerContainerComponent],
  providers: [{ provide: DEFAULT_TIMER, useValue: 1000 }],
  template: `
    <div class="flex gap-2">
      Video Call Timer:
      <p class="italic">(should be the default 1000s)</p>
    </div>
    <timer-container />
  `,
})
export default class VideoComponent {}
