import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>Dashboard for Client works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardClientComponent {}
