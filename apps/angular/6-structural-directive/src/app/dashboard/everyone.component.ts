import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>dashboard for Everyone works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { hostID: crypto.randomUUID().toString() },
})
export default class EveryoneDashboardComponent {}
