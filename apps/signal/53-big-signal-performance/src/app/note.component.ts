import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.service';

@Component({
  selector: 'note',
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Note: {{ userService.userNote() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class NoteComponent {
  userService = inject(UserStore);
}
