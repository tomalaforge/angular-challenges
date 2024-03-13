import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CDFlashingDirective],
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class HeaderComponent {
  title = input<string>('');
}
