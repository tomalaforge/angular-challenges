import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-random',
  template: `
    <div cd-flash>I do nothing but I'm here</div>
    <button (click)="handleClick($event)">Click me</button>
  `,
  imports: [CDFlashingDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomComponent {
  handleClick(event: Event) {
    console.log('Clicked', event);
  }
}
