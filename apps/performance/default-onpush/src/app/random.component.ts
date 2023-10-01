import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-random',
  standalone: true,
  template: `<div cd-flash>I do nothing but I'm here</div>`,
  imports: [CDFlashingDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomComponent {}
