import { Component, inject } from '@angular/core';
import { TIMER_TOKEN } from './data';
import { TimerComponent } from './timer.component';

// https://angular.io/errors/NG0912
// https://stackoverflow.com/questions/51519360/how-to-use-multiple-instances-of-same-component-in-angular-6
// https://dontpaniclabs.com/blog/post/2023/03/15/setting-up-injection-tokens-with-dynamic-values/

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
  timer = inject(TIMER_TOKEN);
}
