import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.service';

@Component({
  selector: 'note',
  template: `
    <div cd-flash class="info-card">
      <h2 class="section-title">Note</h2>
      <div>{{ userService.note() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class NoteComponent {
  userService = inject(UserStore);
}
