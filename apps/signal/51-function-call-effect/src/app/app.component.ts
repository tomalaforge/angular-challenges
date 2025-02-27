import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionsComponent } from './action.component';
import { UserService } from './user.service';

@Component({
  standalone: true,
  imports: [FormsModule, ActionsComponent],
  selector: 'app-root',
  template: `
    <nav class="nav-bar">
      <span class="text-gray-700">Profile selected:</span>
      <div class="select-wrapper">
        <select [(ngModel)]="userService.name" name="name" class="form-select">
          <option selected>Please choose an user</option>
          @for (user of users; track $index) {
            <option value="{{ user }}">{{ user }}</option>
          }
        </select>
      </div>
    </nav>

    <app-actions />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected userService = inject(UserService);

  protected users = ['Thomas', 'John', 'Alice', 'Bob', 'Charlie', 'David'];
}
