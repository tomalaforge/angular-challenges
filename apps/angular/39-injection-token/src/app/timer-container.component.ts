import { Component, inject } from '@angular/core';
import { TIMER } from './data';
import { TimerComponent } from './timer.component';
@Component({
  selector: 'timer-container',
  standalone: true,
  imports: [TimerComponent],
  template: `
    <div class="flex gap-2">
      Timer container:
      <p class="italic">(timer is {{ timer }}s)</p>
    </div>
    <timer />
  `,
  host: {
    class: 'border rounded-md flex p-4 gap-10',
  },
})
export class TimerContainerComponent {
  timer = inject(TIMER);
}
