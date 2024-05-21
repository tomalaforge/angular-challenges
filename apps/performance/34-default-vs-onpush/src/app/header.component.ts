import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CDFlashingDirective],
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly title = signal<string>('');
}
