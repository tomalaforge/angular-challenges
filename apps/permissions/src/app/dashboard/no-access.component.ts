import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-no-access',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>No Access.</p>
    <button app-button routerLink="/">Back</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoAccessDashboardComponent {}
