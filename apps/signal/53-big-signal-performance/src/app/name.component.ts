import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.service';

@Component({
  selector: 'name',
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Name: {{ userService.userName() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class NameComponent {
  userService = inject(UserStore);
}
