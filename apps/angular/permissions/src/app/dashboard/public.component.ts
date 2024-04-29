import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  standalone: true,
  template: `
    <p>Dashboard for Public !!!</p>
    <button app-button routerLink="/">Log out</button>
  `,
  styles: [],
  imports: [ButtonComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicComponent {}
