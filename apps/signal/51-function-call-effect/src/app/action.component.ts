import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-actions',
  template: `
    <form class="form-container">
      <div class="form-group">
        <label for="actions" class="form-label">Choose an action</label>
        <div class="select-wrapper">
          <select
            name="actions"
            [(ngModel)]="action"
            id="actions"
            class="form-select">
            <option selected>Please select an action</option>
            @for (action of actions; track $index) {
              <option value="{{ action }}">{{ action }}</option>
            }
          </select>
        </div>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  private userService = inject(UserService);
  protected action = signal<string | undefined>(undefined);
  protected actions = ['Create', 'Read', 'Update', 'Delete'];

  constructor() {
    effect(() => {
      const currentAction = this.action();
      const currentUser = this.userService.name();

      if (currentAction) {
        console.log(`${currentUser}: ${currentAction}`);
      }
    });
  }
}
