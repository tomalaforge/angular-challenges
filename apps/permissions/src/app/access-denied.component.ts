import { ButtonComponent } from './button.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'access-denied',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  template: `
    <p class="text-red-900 text-7xl">Access Denied!</p>
    <button app-button [routerLink]="['/']">Back to login</button>
  `,
  host: {
    class:
      'flex flex-col justify-center items-center h-[calc(100vh-100px)] gap-6',
  },
})
export class AccessDeniedComponent {}
