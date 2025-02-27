import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.service';

@Component({
  selector: 'name',
  template: `
    <div cd-flash class="info-card">
      <h2 class="section-title">Name</h2>
      <div>{{ userService.name() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class NameComponent {
  userService = inject(UserStore);
}
