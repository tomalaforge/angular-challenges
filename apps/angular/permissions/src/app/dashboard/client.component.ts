import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  template: `
    <p>Dashboard for Client !!!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  styles: [],
})
export class ClientComponent {}
