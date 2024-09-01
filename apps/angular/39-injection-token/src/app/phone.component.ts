import { Component } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `
    <div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <!-- <timer-container   /> -->
    <timer-container [timer]="2000"></timer-container>
  `,
})
export default class PhoneComponent {}
