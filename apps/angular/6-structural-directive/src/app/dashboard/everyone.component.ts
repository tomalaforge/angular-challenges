import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-dashboard-all',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>dashboard for All works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EveryoneDashboardComponent {}
