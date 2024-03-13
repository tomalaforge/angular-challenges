import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-random',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
  template: `
    <div cd-flash>I do nothing but I'm here</div>
  `,
})
export class RandomComponent {}
