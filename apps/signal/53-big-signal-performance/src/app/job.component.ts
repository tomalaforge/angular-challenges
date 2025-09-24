import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.service';

@Component({
  selector: 'job',
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Job:
      <div>title: {{ userService.userTitle() }}</div>
      <div>salary: {{ userService.userSalary() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class JobComponent {
  userService = inject(UserStore);
}
