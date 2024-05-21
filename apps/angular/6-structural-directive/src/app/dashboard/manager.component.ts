import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>dashboard for Manager works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerDashboardComponent {}
