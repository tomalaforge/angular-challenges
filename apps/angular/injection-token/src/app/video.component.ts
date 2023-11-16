import { Component } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { provideTimer } from './data';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [TimerContainerComponent],
  providers: [provideTimer()],
  template: `<div class="flex gap-2">
      Video Call Timer:
      <p class="italic">(should be the default 1000s)</p>
    </div>
    <timer-container />`,
})
export default class VideoComponent {}
