import { Component,inject } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { DEFAULT_TIMER } from './data';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `
    <div class="flex gap-2">
      Video Call Timer:
      <p class="italic"> {{defaultTimer}}s</p>
    </div>
    <timer-container />
  `,
})
export default class VideoComponent {
  defaultTimer = inject(DEFAULT_TIMER);
}
