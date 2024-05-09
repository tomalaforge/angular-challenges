import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>dashboard for Client works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClientDashboardComponent {}
