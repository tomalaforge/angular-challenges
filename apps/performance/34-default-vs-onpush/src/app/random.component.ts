import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [CDFlashingDirective],
  template: `
    <div cd-flash>I do nothing but I'm here</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomComponent {}
