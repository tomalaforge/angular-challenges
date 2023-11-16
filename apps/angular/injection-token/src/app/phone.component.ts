import { Component } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { provideTimer } from './data';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  providers: [provideTimer(2000)],
  template: `<div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />`,
})
export default class PhoneComponent {}
