import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { Component } from '@angular/core';

@Component({
  selector: 'app-random',
  template: `
    <div cd-flash>I do nothing but I'm here</div>
  `,
  imports: [CDFlashingDirective],
})
export class RandomComponent {}
