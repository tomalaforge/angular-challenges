import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionsComponent } from './action.component';
import { UserService } from './user.service';

@Component({
  imports: [FormsModule, ActionsComponent],
  selector: 'app-root',
  template: `
    <nav class="flex w-full items-center border border-b">
      Profile selected:
      <form class="m-4 w-48">
        <select
          [(ngModel)]="userService.name"
          name="name"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ">
          <option selected>Please choose an user</option>
          @for (user of users; track $index) {
            <option value="{{ user }}">{{ user }}</option>
          }
        </select>
      </form>
    </nav>

    <app-actions />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected userService = inject(UserService);

  protected users = ['Thomas', 'John', 'Alice', 'Bob', 'Charlie', 'David'];
}
