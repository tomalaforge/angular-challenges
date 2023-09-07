import { Component } from '@angular/core';
@Component({
  selector: 'app-random',
  standalone: true,
  template: `I do nothing but I'm here: {{ count() }}`,
})
export class RandomComponent {
  counter = 0;

  count() {
    return this.counter++;
  }
}
