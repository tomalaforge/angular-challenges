import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.service';

@Component({
  selector: 'job',
  template: `
    <div cd-flash class="info-card">
      <h2 class="section-title">Job</h2>
      <div class="space-y-2">
        <div>Title: {{ job().title }}</div>
        <div>Salary: {{ job().salary }}</div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class JobComponent {
  private userService = inject(UserStore);
  protected job = this.userService.job;
}
