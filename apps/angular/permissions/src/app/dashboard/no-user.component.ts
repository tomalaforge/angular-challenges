import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  template: `
    <p>User is not Logged In</p>
    <button app-button routerLink="/">Log out</button>
  `,
  standalone: true,
  styles: [],
  imports: [ButtonComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoUserComponent {}
